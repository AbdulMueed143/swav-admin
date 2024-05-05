import React, { useState, useEffect,  useRef } from 'react';
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Button from "@mui/material/Button";
import moment, { weekdays } from 'moment';
import { TimePicker } from 'antd';
import useAvailabilityService from 'utils/hooks/CustomServices/useAvailabilityService';
import { slotToStartAndEndDateTimeArray, isObjectWithAtLeastOneKey } from './utils';
import { FormItem, FormContainer, Calendar } from 'components/ui'
import TimeInput from 'components/ui/TimeInput'
import { Field, Form, Formik } from 'formik'

// Example with FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { Loading } from 'components/shared';


export default function OverrideDates({updateBarber, onOverrideDatesUpdate, templateInitialState}) {

    //Constants to be used
    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const [defaultWeekDays, setDefaultWeekDays] = useState({
        "MONDAY": [],
        "TUESDAY": [],
        "WEDNESDAY": [],
        "THURSDAY": [],
        "FRIDAY": [],
        "SATURDAY": [],
        "SUNDAY": []
    });
    const shortMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const { barberId, firstName, lastName, email, barberAvailability, about, status } = updateBarber;

    //Variables to be used

    //Use state methods to be used
    const {  updateBarberAvailability , fetchAvailabilityForDate, updateBarberAvailabilityForDate } = useAvailabilityService();
    const [overrideDates, setOverrideDates] = useState({});
    const { TimeInputRange } = TimeInput
    const [timeRangeValue, setTimeRangeValue] = useState()
    const [loading, setLoading] = useState(false);
    const [loadingSpecificDateSlots, setLoadingSpecificDateSlots] = useState(false);
    const [selectedDateToBeOverrided, setSelectedDateToBeOverrided] = useState(new Date());
    const [slotsForToday, setSlotsForToday] = useState([]);

    //methods from custom util
    const initializeWeekDays = () => {
        console.log("What is my initial state? ", templateInitialState, isObjectWithAtLeastOneKey(templateInitialState));

        if(isObjectWithAtLeastOneKey(templateInitialState)) {
            return templateInitialState;
        } else { 

            const withDayOfWeek = updateBarber?.barberAvailability?.filter(item => item?.barberAvailabilitiesTemplate?.hasOwnProperty('dayOfWeek'));
            
            const initialWeekDays = { ...defaultWeekDays };
            // Iterate over each day of the week
            for (const day in initialWeekDays) {
                withDayOfWeek?.map( barber => {
                    if(barber?.barberAvailabilitiesTemplate?.dayOfWeek == day) {
                        //get all the timeslots 
                        const slots = barber?.barberAvailabilitiesTemplate?.timeSlots;
                        initialWeekDays[day] = slots;
                    }
                });
            }
            return initialWeekDays;
        }
    };

    const handleOverrideDateChange = (event) => {
        setSelectedDateToBeOverrided(event);
    }

    useEffect(() => {
        const fetchData = async () => {

            setDefaultWeekDays({
                "MONDAY": [],
                "TUESDAY": [],
                "WEDNESDAY": [],
                "THURSDAY": [],
                "FRIDAY": [],
                "SATURDAY": [],
                "SUNDAY": []
            });

            setWeekDays(initializeWeekDays());

            const withDate = updateBarber?.barberAvailability?.filter(item => item?.barberAvailabilitiesTemplate?.hasOwnProperty('date'));
            const withDayOfWeek = updateBarber?.barberAvailability?.filter(item => item?.barberAvailabilitiesTemplate?.hasOwnProperty('dayOfWeek'));

            withDate?.map( barber => {
                //get all the timeslots 
                const slots = barber?.barberAvailabilitiesTemplate?.timeSlots;
                overrideDates[barber?.barberAvailabilitiesTemplate?.date] = slots;
            });

            const dateLookingFor = formatDateAsServerDate(selectedDateToBeOverrided);
            let filteredDates = [];
            if (Array.isArray(overrideDates)) {
                filteredDates = overrideDates.filter(item => item.barberAvailabilitiesTemplate.date === dateLookingFor);
            } else {
                console.log('overrideDates is not an array:', overrideDates);
            }
            //we also need to see that if we do not find override items for this date, then we will add shift from template
            const foundItem =  filteredDates.filter(item => item.barberAvailabilitiesTemplate.date == dateLookingFor);

            if (foundItem?.length > 0) {
                // we already have shifts for this date here ... no need to load again ...
                console.log("we have shifts for this date ", foundItem);
                //if we found item, we have dates for this date and lets use them ..
            } else {
                //otherwise check what day is this date and get items from that array and fill it up mati!
                //lets add items if we have them in 
                let nameOfTheSelectedDate = dayNames[new Date(dateLookingFor).getDay()].toUpperCase();
                let slotsForSelectedDate = weekDays[nameOfTheSelectedDate];

                //add these slots to the override dates now
                overrideDates[formatDateAsServerDate(new Date(dateLookingFor))] = slotsForSelectedDate;

                console.log("we do not have shifts for this date ", dateLookingFor, slotsForSelectedDate, withDayOfWeek);

            }
        };
    
        fetchData().catch(console.error); // Call the async function and handle any errors
    }, [selectedDateToBeOverrided, overrideDates]);


    //New methods
    const addShift = () => {
        //create eempty slot and the date we are doing this will be selectedDateToBeOverrided
        const createdSlot = createEmptySlot(selectedDateToBeOverrided.getDate().toString());
        updateOverrideDates(formatDateAsServerDate(selectedDateToBeOverrided), createdSlot);
    }

    const updateOverrideDates = (selectedDate, newShifts) => {

        // setOverrideDates(prevDates => {
        //  // Initialize prevDates as an empty object if it's null
        //     const updatedDates = prevDates ? { ...prevDates } : {};

        //     // Check if the selectedDate already exists and is iterable
        //     if (updatedDates[selectedDate]) {
        //     // If the date exists, concatenate the new shifts to the existing ones
        //     updatedDates[selectedDate] = [...updatedDates[selectedDate], newShifts];
        //     } else {
        //     // If the date does not exist, add a new entry with the new shifts
        //     updatedDates[selectedDate] = newShifts;
        //     }

        //     return updatedDates;
        // });
      };


    const formatDate = (date) => {
        const d = new Date(date);
        let month = '' + shortMonths[d.getMonth()];
        let day = '' + d.getDate();
        const year = d.getFullYear();
        const todayDay = dayNames[d.getDay()];
    
        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;
    
        return '('+todayDay+') '+day+' '+month+',' + year;
      };

    const formatDateAsServerDate = (date) => {

        const d = new Date(date);
        let month = '' + (d.getMonth() + 1 );
        let day = '' + d.getDate();
        const year = d.getFullYear();
    
        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;
    
        return year + '-'+month + '-'+day;
    };

    const [weekDays, setWeekDays] = useState(null);


    //Shift add Functionality for specific date
    const [startTimeSD, setStartTimeSD] = useState(null);
    const [endTimeSD, setEndTimeSD] = useState(null);

    // const onSDDialogOk = () => {
    //     const selectedStartTime = moment(startTimeSD, 'hh:mm a');
    //     const selectedEndTime = moment(endTimeSD, 'hh:mm a');
    //     setSDDialogOpen(false)

    //     if(startTimeSD != endTimeSD) {
    //         const createdSlot = createSlotSD(selectedDateToBeOverrided, selectedStartTime, selectedEndTime);

    //         updateOverrideDates(formatDateAsServerDate(selectedDateToBeOverrided), [createdSlot]);
    
    //         setStartTimeSD(null);
    //         setEndTimeSD(null);
    //     }
    // }

    // const updateOverrideDates = (selectedDate, newShifts) => {
    //     setOverrideDates(prevDates => {
    //      // Initialize prevDates as an empty object if it's null
    //         const updatedDates = prevDates ? { ...prevDates } : {};

    //         // Check if the selectedDate already exists and is iterable
    //         if (updatedDates[selectedDate]) {
    //         // If the date exists, concatenate the new shifts to the existing ones
    //         updatedDates[selectedDate] = [...updatedDates[selectedDate], ...newShifts];
    //         } else {
    //         // If the date does not exist, add a new entry with the new shifts
    //         updatedDates[selectedDate] = newShifts;
    //         }

    //         return updatedDates;
    //     });
    //   };


    // const createSlotSD = (day, selectedStartTime, selectedEndTime) =>{
    //     return createEmptySlot(day)
    // }

    const createEmptySlot = (selectedDate) => {
        return {
            attendanceStatus: "TO_BE_MARKED",
            slotName : selectedDate,
            startTime : {
                hour : 0,
                minute :  0
            },
            endTime : {
                hour : 0,
                minute :  0
            }
        }
    }

    const createSlotWithStartEndDatetime = (previousSlot, startDateTime, endDateTime) =>{
        return {
            attendanceStatus: previousSlot.attendanceStatus,
            slotName : previousSlot.slotName,
            startTime : {
                hour : startDateTime.hour(),
                minute :  startDateTime.minute()
            },
            endTime : {
                hour : endDateTime.hour(),
                minute : endDateTime.minute()
            }
        }
    }

    const addObjectToDay = (selectedDay, newSlot) => {

        for (const day in weekDays) {
            if(day == selectedDay) {

                setWeekDays(prevWeekDays => {
                    // Clone the entire state
                    const updatedWeekDays = { ...prevWeekDays };
                
                    // Make sure the day array exists
                    if (!updatedWeekDays[selectedDay]) {
                      updatedWeekDays[selectedDay] = [];
                    }
                
                    // Add the new slot to the cloned array
                    updatedWeekDays[selectedDay] = [...updatedWeekDays[selectedDay], newSlot];
                
                    // Return the updated state
                    return updatedWeekDays;
                  });
            }
        }

        console.log("weekDays " ,  weekDays)

    };

    const onAddDay = (day) => {
        const createdSlot = createEmptySlot(day);
        addObjectToDay(day, createdSlot);
    }

    // const createSlot = (day, selectedStartTime, selectedEndTime) =>{
    //     return {
    //         attendanceStatus: "TO_BE_MARKED",
    //         slotName : day,
    //         startTime : {
    //             hour : selectedStartTime.hour(),
    //             minute :  selectedStartTime.minute()
    //         },
    //         endTime : {
    //             hour : selectedEndTime.hour(),
    //             minute : selectedEndTime.minute()
    //         }
    //     }
    // }


    // const addObjectToDay = (selectedDay, newSlot) => {

    //     for (const day in weekDays) {
    //         if(day == selectedDay) {
    //             //get all the timeslots 
    //             weekDays[selectedDay].push(newSlot);
    //         }
    //     }
    // };

    const removeSlotFromDate = (date, index) => {
        setOverrideDates(prevWeekDates => {
            const updatedDate = [...prevWeekDates[date]];
    
            updatedDate.splice(index, 1);
    
            // Return the updated state
            return {
                ...prevWeekDates,
                [date]: updatedDate
            };
        });
    };

    const removeSlotFromDay = (day, index) => {
        setWeekDays(prevWeekDays => {
            // Clone the array for the selected day
            const updatedDay = [...prevWeekDays[day]];
    
            // Remove the item at the specified index
            updatedDay.splice(index, 1);
    
            // Return the updated state
            return {
                ...prevWeekDays,
                [day]: updatedDay
            };
        });
    };

    const formIkRef = useRef();

    return (
        <div stlye={{}}>
            <div>
                <Formik
                    enableReinitialize
                    initialValues={{
                       
                    }}
                    onSubmit={(values, { setSubmitting }) => {
                        setSubmitting(false);
                    }}
                    innerRef={formIkRef}
                >
                    {({ values, touched, errors, resetForm, submitForm }) => (
                        <div>

                            <div style={{marginTop: '10px', marginBottom: '10px'}}>
                                <h5>If you want to change shifts for any specific date, please select date here and change shift for specific date.</h5>
                                <div style={{display: 'flex', marginTop: '10px'}}>  

                                    <div style={{width : '50%'}}>
                                        <Calendar value={selectedDateToBeOverrided} onChange={handleOverrideDateChange} />
                                    </div>

                                    <div style={{width: '50%', background:'#eee', padding: '10px', borderRadius: '10px'}}>
                                        
                                        <div>
                                            <h6>{formatDate(selectedDateToBeOverrided)}</h6>
                                        <div>

                                        {loadingSpecificDateSlots ? (
                                            <div>
                                                <Loading loading={loadingSpecificDateSlots} >
                                                </Loading>
                                            </div>
                                        ) 
                                        : (
                                            <div>
                                                {overrideDates[formatDateAsServerDate(selectedDateToBeOverrided)]?.length > 0 ? (
                                                    overrideDates[formatDateAsServerDate(selectedDateToBeOverrided)].map((slot, index) => (
                                                        <div key={index} className="slot-container">
                                                            <TimeInputRange
                                                                format="12"
                                                                value={slotToStartAndEndDateTimeArray(slot)}
                                                            /> 
                                                            <button className='slots-delete-icon '>
                                                                <FontAwesomeIcon icon={faTrash} onClick={() => removeSlotFromDate(formatDateAsServerDate(selectedDateToBeOverrided), index)} />
                                                            </button>  
                                                        </div>
                                                    ))
                                                ) : (
                                                    <p className="no-availability slot">N/A</p>
                                                )}
                                            </div>)}
                                                <Button className="add-btn"onClick={() => addShift()}>Add</Button>
                                            </div>
                                        </div>
                                    </div>                          
                                </div>
                            </div>

                        </div>
                    )}
                </Formik>
            </div>
        </div>
    );
}
