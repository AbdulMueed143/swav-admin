import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import Data from './barberAvailabilityData';
import styles from './editBarberAvailability.module.css';
import { makeStyles } from '@material-ui/core/styles';
import { CalendarView } from "components/shared";
import CustomTimePicker from "./CustomTimePicker";
import classNames from "classnames";
import { useNavigate } from "react-router-dom";
import HolidayDatePicker from "./HolidayDatePicker ";

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 220,
    },
    removeBottomBorder: {
        '& .MuiInput-underline:before': {
            borderBottom: 'none',
            content: '',
            display: 'none'
        }
    },
}));

const EditBarberAvailability = (props) => {
    const { barberId } = useParams();
    const currentData = Data[barberId - 1];
    const [staticTimeSlots, setStaticTimeSlots] = useState(currentData);
    const [openPopup, setOpenPopup] = useState(false); // to Set default state of add time slot for both
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [chooseHolidayDate, setChooseHolidayDate] = useState([]);
    const [showHolidayDates, setShowHolidayDates] = useState(false);
    const [showAddHolidayCTA, setShowAddHolidayCTA] = useState(false);
    const [selectedDay, setSelectedDay] = useState('');
    const [isDateRangeSelected, setIsDateRangeSelected] = useState(false);
    const [staticTimeSlotClick, setStaticTimeSlotClick] = useState(false);
    const [removeSelectedDateRange, setRemoveSelectedDateRange] = useState(false);


    let navigate = useNavigate();

    const handleDelete = (day, index) => {
        const normalizeData = staticTimeSlots.staticAvailability.map(item => {
            if (item.day === day) {
                item.staticTimeSlot = item.staticTimeSlot.filter((_, i) => i !== index);
                if (item.staticTimeSlot.length < 1) {
                    console.log('HOLIDAY...');
                }
            }
            return item;
        })
        setStaticTimeSlots({ ...currentData, staticAvailability: normalizeData });
    };

    const today = new Date().toISOString().split('T')[0];
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    const pickSelectedDateHandler = (selectedLeaveDate) => {
        if (selectedLeaveDate.length) {
            setShowAddHolidayCTA(true);
        }

        selectedLeaveDate.map(currentDate => {
            const isDateAlreadySelected = chooseHolidayDate.some((dateItem) => {
                return (
                    JSON.stringify(dateItem) === JSON.stringify(currentDate)
                )
            })
            if (!isDateAlreadySelected) {
                setChooseHolidayDate(selectedLeaveDate);
            } else {
                // console.log('Date is already selected:: ', currentDate);
            }
        })
    }

    const showHolidayList = (value) => {
        setShowHolidayDates(value);
    }

    const saveHolidaysHandler = () => {
        setShowHolidayDates(true);
        console.log('saveHolidaysHandler:')
    }

    const deleteChoosenHolidayDate = (indexValue) => {
        const updatedChooseHolidayDate = [...chooseHolidayDate];
        updatedChooseHolidayDate.splice(indexValue, 1);
        setChooseHolidayDate(updatedChooseHolidayDate);
        if (!updatedChooseHolidayDate.length) {
            setShowHolidayDates(false);
            setIsDateRangeSelected(true);
            setRemoveSelectedDateRange(true);
            //Need to write logic to unselect choosen holiday dates
        }
    }

    const updateRemoveSelectedDateRange = (value) => {
        setRemoveSelectedDateRange(value);
    };

    const goBack = () => {
        navigate('/availability');
    }

    const saveData = () => {
        // console.log('saveData...');
    }

    const handleStartTimeChange = (newTime) => {
        setStartTime(newTime);
    };

    const handleEndTimeChange = (newTime) => {
        setEndTime(newTime);
    };

    const handleClosePopup = () => {
        setOpenPopup(false);
        setStartTime('');
        setEndTime('');
        setStaticTimeSlotClick(false);
    };

    const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

    //This fn is to add the shift => staticAvailability.staticTimeSlot and availability.timeSlot both
    const saveShiftPopup = (day) => {
        if (startTime && endTime) {
            const currentObject = staticTimeSlots.availability;
            if (!staticTimeSlotClick) { // Assume clicked on Calendar view
                const checkIfDateIsPresentInAvailableTimeSlot = currentObject.some(item => item.date === day);
                if(checkIfDateIsPresentInAvailableTimeSlot){
                    const index = currentObject.findIndex(item => item.date === day);
                    if(currentObject[index].status !== 'offline'){
                        currentObject[index].timeSlot.push(startTime + " - " + endTime);
                    } else {
                        currentObject[index].status = 'active';
                        currentObject[index].timeSlot.push(startTime + " - " + endTime);
                    }
                setStaticTimeSlots({ ...currentData, availability: currentObject });
                } else {
                    const newObject = {
                        "day": weekdays[new Date(day).getDay()],
                        "date": day,
                        "status": "active",
                        "timeSlot": [startTime + " - " + endTime],
                        "holiday": false
                    };
                    currentObject.push(newObject);
                    setStaticTimeSlots({ ...currentData, availability: currentObject });
                }
                // setStaticTimeSlots({ ...currentData, availability: currentObject });
            } else {
                const normalizeData = staticTimeSlots.staticAvailability.map(item => {
                        if (item.day === day) {
                            item.staticTimeSlot.push(startTime + " - " + endTime);
                        }
                    return item;
                })
                setStaticTimeSlots({ ...currentData, availability: normalizeData });
            }
        } else {
            alert('Choose the date to Add the Shift ')
        }
        handleClosePopup();
    }

    //This fn is to set the Static Time Slot using [+Add Shift] Button
    const changeShiftHandler = (day) => {
        setOpenPopup(true);
        setSelectedDay(day);
        setStaticTimeSlotClick(true);
    }

    //This fn is to set the Time Slot using onClick events on Calendar View
    const addDataToCalendarViewOnClick = (date) => {
        setOpenPopup(true); // To Open the PopUp To Add Time Slot
        setSelectedDay(date);
        // setStartTimeAtCalendar(true);
        setStaticTimeSlotClick(false);
    }

    const addShiftPopUpDOM = (day) => {
        return (
            <div className={styles.addShiftPopUp}>
                <div className={styles.addShiftPopUpWrapper}>
                    <p className="font-semibold">Choose Shift</p>
                    <CustomTimePicker value={startTime} onChange={handleStartTimeChange} labelText="Select Start Time" />
                    <CustomTimePicker value={endTime} onChange={handleEndTimeChange} labelText="Select End Time" />
                    <button className={styles.addShiftBtnPopUp} onClick={() => saveShiftPopup(day)} disabled={!(startTime && endTime)}>Save</button>
                    <button className={styles.closeBtn} onClick={() => handleClosePopup()}>X</button>
                </div>
            </div>
        )
    }

    const weekdayNameHeaderClasses = classNames('flex', 'flex-row', styles.row, styles.header);
    return (
        <div>
            <button className={styles.backBtn} onClick={() => goBack()}> &lt; Back</button>
            <div className={styles.barberWrapper}>
                <h1 className="">{currentData?.name}</h1>
                <img
                    src={currentData?.userpic}
                    className="w-20 h-20 rounded-full my-6"
                    alt="Barber"
                />
                <button className={`${styles.saveData} ${styles.addBtn}`} onClick={() => saveData()} variant="outlined" disabled>save Data</button>
            </div>
            <div className={`${styles.editWrapper} flex gap-10`}>
                <div className={`${styles.calendarView}`}>
                    <div className={weekdayNameHeaderClasses}>
                        <div className={styles.cell}>Monday</div>
                        <div className={styles.cell}>Tuesday</div>
                        <div className={styles.cell}>Wednesday</div>
                        <div className={styles.cell}>Thursday</div>
                        <div className={styles.cell}>Friday</div>
                        <div className={styles.cell}>Saturday</div>
                        <div className={styles.cell}>Sunday</div>
                    </div>
                    {/* Show Static Time Slots */}
                    {
                        staticTimeSlots && (
                            <div className={`flex flex-row ${styles.row} relative`} key={staticTimeSlots.id}>
                                {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day, i) => {
                                    const availability = staticTimeSlots.staticAvailability.find((slot) => slot.day === day);
                                    return (
                                        <div className={`${styles.cell} ${styles.fs12} ${(availability.staticTimeSlot.length === 0) ? styles.holiday : styles.notHoliday}`} key={i}>
                                            {availability ? (
                                                availability.staticTimeSlot.length > 0 ? (
                                                    availability.staticTimeSlot.map((item, index) => {
                                                        return (
                                                            <div><span className={styles.itemWrap}>{item}</span><button className={styles.deleteShift} onClick={() => handleDelete(day, index)} key={index}>X</button></div>
                                                        )
                                                    })
                                                ) : (
                                                    'Holiday'
                                                )
                                            ) : ('Holiday'
                                            )}
                                            <div className={styles.addShiftBtn}>
                                                <button className={styles.addBtn} onClick={() => changeShiftHandler(day)}>+ Add Shift</button>
                                            </div>
                                        </div>
                                    );
                                })}
                                {
                                    openPopup && addShiftPopUpDOM(selectedDay)
                                }
                            </div>
                        )
                    }
                    <div className={styles.barberCalendar}>
                        <h2 className="">Override</h2>
                        <CalendarView DATA={staticTimeSlots} addDataToCalendarViewOnClick={addDataToCalendarViewOnClick} calendarClass={styles.breakTimeSlots} wrapperClass={styles.calendarCss} />
                    </div>
                </div>

                {/* Add Holiday Component */}
                <div className={`${styles.addShift}`}>
                    <div className={`${styles.calendarWrapper}`}>
                        <p className="text-black">Choose Holiday Date</p>
                        <HolidayDatePicker pickDateHandler={pickSelectedDateHandler} showHolidayList={showHolidayList} isDateRangeSelected={removeSelectedDateRange}  updateRemoveSelectedDateRange={updateRemoveSelectedDateRange}/>
                        {/* {showAddHolidayCTA && <button className={`${styles.addBtn} ${styles.addHoliday}`} onClick={() => addHolidayHandler()}>+ Add Holiday</button>} */}
                    </div>
                    {
                        showHolidayDates && (
                            <div className={`${styles.saveBtnWrapper}`}>
                                <p className={`${styles.holidayListText} font-medium`}>List of Holiday Choosen</p>
                                <div className={`${styles.holidayList}`}>
                                    <ul>
                                        {
                                            chooseHolidayDate.map((date, index) => (
                                                <li key={index}>
                                                    <span className={styles.leaveDate}>
                                                        {date}
                                                    </span>
                                                    <span className={styles.deleteIcon} onClick={() => deleteChoosenHolidayDate(index)}>
                                                        <DeleteIconManual />
                                                    </span>
                                                </li>
                                            ))
                                        }
                                    </ul>
                                </div>
                            </div>
                        )
                    }
                    {
                        showHolidayDates && (
                            <button className={styles.saveBtn} onClick={() => saveHolidaysHandler()}> Save</button>
                        )
                    }
                </div>

                
            </div>
        </div >
    )
}

function DeleteIconManual() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 30 30">
            <path d="M 14.984375 2.4863281 A 1.0001 1.0001 0 0 0 14 3.5 L 14 4 L 8.5 4 A 1.0001 1.0001 0 0 0 7.4863281 5 L 6 5 A 1.0001 1.0001 0 1 0 6 7 L 24 7 A 1.0001 1.0001 0 1 0 24 5 L 22.513672 5 A 1.0001 1.0001 0 0 0 21.5 4 L 16 4 L 16 3.5 A 1.0001 1.0001 0 0 0 14.984375 2.4863281 z M 6 9 L 7.7929688 24.234375 C 7.9109687 25.241375 8.7633438 26 9.7773438 26 L 20.222656 26 C 21.236656 26 22.088031 25.241375 22.207031 24.234375 L 24 9 L 6 9 z"></path>
        </svg>
    )
}

export default EditBarberAvailability;