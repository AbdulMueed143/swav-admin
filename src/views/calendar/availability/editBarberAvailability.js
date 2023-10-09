import React, { useRef, useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import Data from './barberAvailabilityData';
import styles from './editBarberAvailability.module.css';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { CalendarView } from "components/shared";
import CustomTimePicker from "./CustomTimePicker";
import classNames from "classnames";
import { useNavigate } from "react-router-dom";
import HolidayDatePicker from "./HolidayDatePicker ";
import { update } from "lodash";

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
    const classes = useStyles();
    const currentData = Data[barberId - 1];
    const [staticTimeSlots, setStaticTimeSlots] = useState(currentData);
    const [openPopup, setOpenPopup] = useState(false);
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [chooseHolidayDate, setChooseHolidayDate] = useState([]);
    const [showHolidayDates, setShowHolidayDates] = useState(false);
    const [showAddHolidayCTA, setShowAddHolidayCTA] = useState(false);
    const [selectedDay, setSelectedDay] = useState('');


    let navigate = useNavigate();

    const handleDelete = (day, index, id) => {
        const normalizeData = staticTimeSlots.availability.map(item => {
            if (item.day === day) {
                item.staticTimeSlot = item.staticTimeSlot.filter((_, i) => i !== index);
            }
            return item;
        })
        setStaticTimeSlots({ ...currentData, availability: normalizeData });
    };

    const today = new Date().toISOString().split('T')[0];
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    const pickSelectedDateHandler = (selectedLeaveDate) => {
        console.log('From Edit: ', selectedLeaveDate);
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
                // setChooseHolidayDate((prevDates) => [...prevDates, ...selectedLeaveDate]);
            } else {
                console.log('Date is already selected:: ', currentDate);
            }
        })
    }
    useEffect(() => {
        console.log('Updated chooseHolidayDate: ', chooseHolidayDate);
    }, [chooseHolidayDate]);

    const addHolidayHandler = () => {
        setShowHolidayDates(true);
        console.log('date added...');
    }

    const saveHolidaysHandler = () => {
        console.log('saveHolidaysHandler:')
    }

    const deleteChoosenHolidayDate = (indexValue) => {
        console.log('deleteChoosenHolidayDate: ', indexValue);
        const updatedChooseHolidayDate = [...chooseHolidayDate];
        updatedChooseHolidayDate.splice(indexValue, 1);
        setChooseHolidayDate(updatedChooseHolidayDate);
        if (!updatedChooseHolidayDate.length) {
            setShowHolidayDates(false);
        }
    }

    const goBack = () => {
        navigate('/availability');
    }

    const saveData = () => {
        console.log('saveData...');
    }

    const handleStartTimeChange = (newTime) => {
        console.log('handleStartTimeChange: ', newTime);
        setStartTime(newTime);
    };

    const handleEndTimeChange = (newTime) => {
        console.log('handleEndTimeChange: ', newTime);
        setEndTime(newTime);
    };

    const handleClosePopup = () => {
        setOpenPopup(false);
        setStartTime('');
        setEndTime('');
    };

    const saveShiftPopup = (day) => {
        console.log('Save Shift...');
        handleClosePopup();
        if (startTime && endTime) {
            const normalizeData = staticTimeSlots.availability.map(item => {
                if (item.day === day) {
                    item.staticTimeSlot.push(startTime + " - " + endTime);
                }
                // debugger
                return item;
            })
            setStaticTimeSlots({ ...currentData, availability: normalizeData });
        } else {
            alert('Choose the date to Add the Shift ')
        }
    }

    const changeShiftHandler = (day) => {
        console.log('Day Called: ', day);
        setOpenPopup(true);
        setSelectedDay(day);
    }

    const openAddShiftPopup = (day) => {
        console.log('Calendar openAddShiftPopup: ', day);
        setOpenPopup(true);
    }

    const addShiftPopUpDOM = (day) => {
        console.log('addShiftPopUpDOM');
        return (
            // <div className={styles.addShiftBtn}>
            <div className={styles.addShiftPopUp}>
                <div className={styles.addShiftPopUpWrapper}>
                    <p className="font-semibold">Choose Shift</p>
                    <CustomTimePicker value={startTime} onChange={handleStartTimeChange} labelText="Select Start Time" />
                    <CustomTimePicker value={endTime} onChange={handleEndTimeChange} labelText="Select End Time" />
                    <button className={styles.addShiftBtnPopUp} onClick={() => saveShiftPopup(day)} disabled={!(startTime && endTime)}>Save</button>
                    <button className={styles.closeBtn} onClick={() => handleClosePopup()}>X</button>
                </div>
            </div>
            // </div>
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
                <button className={`${styles.saveData} ${styles.addBtn}`} onClick={() => saveData()}  variant="outlined" disabled>save Data</button>
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
                    {
                        staticTimeSlots && (
                            <div className={`flex flex-row ${styles.row} relative`} key={staticTimeSlots.id}>
                                {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => {
                                    const availability = staticTimeSlots.availability.find((slot) => slot.day === day);
                                    return (
                                        <div className={`${styles.cell} ${styles.fs12} ${availability?.status !== 'active' ? styles.holiday : styles.notHoliday}`} key={day}>
                                            {availability ? (
                                                availability.status === 'active' ? (
                                                    availability.staticTimeSlot?.map((item, index) => {
                                                        return (
                                                            <div><span className={styles.itemWrap}>{item}</span><button className={styles.deleteShift} onClick={() => handleDelete(day, index, staticTimeSlots.id)}>X</button></div>
                                                        )
                                                    })
                                                ) : (
                                                    'Holiday'
                                                )
                                            ) : ('Holiday'
                                            )}
                                            <div className={styles.addShiftBtn}>
                                                <button className={styles.addBtn} onClick={() => changeShiftHandler(day, staticTimeSlots.id)}>+ Add Shift</button>
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
                        <CalendarView DATA={Data[barberId - 1]} openAddShiftPopup={openAddShiftPopup} calendarClass={styles.breakTimeSlots} wrapperClass={styles.calendarCss} />
                    </div>
                </div>
                {/* Add Holiday Component */}
                <div className={`${styles.addShift}`}>
                    <div className={`${styles.calendarWrapper}`}>
                        <p className="text-black">Choose Holiday Date</p>
                        <HolidayDatePicker pickDateHandler={pickSelectedDateHandler} />
                        {showAddHolidayCTA && <button className={`${styles.addBtn} ${styles.addHoliday}`} onClick={() => addHolidayHandler()}>+ Add Holiday</button>}
                    </div>
                    {
                        showHolidayDates && (
                            <div className={`${styles.saveBtnWrapper}`}>
                                <div className={`${styles.holidayList}`}>
                                    <ul>
                                        {
                                            chooseHolidayDate.map((date, index) => (
                                                <li key={index}>
                                                    <span className={styles.leaveDate}>
                                                        {/* {date.selectedDay} {date.selectedMonth} {date.selectedYear} */}
                                                        {date}
                                                    </span>
                                                    <span className={styles.deleteIcon} onClick={() => deleteChoosenHolidayDate(index)}>
                                                        <DeleteIcon />
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

function DeleteIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 30 30">
            <path d="M 14.984375 2.4863281 A 1.0001 1.0001 0 0 0 14 3.5 L 14 4 L 8.5 4 A 1.0001 1.0001 0 0 0 7.4863281 5 L 6 5 A 1.0001 1.0001 0 1 0 6 7 L 24 7 A 1.0001 1.0001 0 1 0 24 5 L 22.513672 5 A 1.0001 1.0001 0 0 0 21.5 4 L 16 4 L 16 3.5 A 1.0001 1.0001 0 0 0 14.984375 2.4863281 z M 6 9 L 7.7929688 24.234375 C 7.9109687 25.241375 8.7633438 26 9.7773438 26 L 20.222656 26 C 21.236656 26 22.088031 25.241375 22.207031 24.234375 L 24 9 L 6 9 z"></path>
        </svg>
    )
}

export default EditBarberAvailability;