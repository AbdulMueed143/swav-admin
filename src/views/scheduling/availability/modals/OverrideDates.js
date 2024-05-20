import React, { useState, useEffect,  useRef, useReducer } from 'react';
import Button from "@mui/material/Button";
import useAvailabilityService from 'utils/hooks/CustomServices/useAvailabilityService';
import { slotToStartAndEndDateTimeArray, isObjectWithAtLeastOneKey, formatDateAsServerDate } from './utils';
import { FormItem, FormContainer, Calendar } from 'components/ui'
import TimeInput from 'components/ui/TimeInput'
import { Field, Form, Formik } from 'formik'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { Loading } from 'components/shared';
import moment, { weekdays } from 'moment';

export default function OverrideDates({updateBarber, onOverrideDatesUpdate, templateInitialState}) {

    //Constants to be used
    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const shortMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const [weekDays, setWeekDays] = useState(null);
    const [defaultWeekDays, setDefaultWeekDays] = useState({
        "MONDAY": [],
        "TUESDAY": [],
        "WEDNESDAY": [],
        "THURSDAY": [],
        "FRIDAY": [],
        "SATURDAY": [],
        "SUNDAY": []
    });

    //Use state methods to be used
    const { updateBarberAvailability , fetchAvailabilityForDate, updateBarberAvailabilityForDate } = useAvailabilityService();
    const [ overrideDates, setOverrideDates] = useState({});
    const { TimeInputRange } = TimeInput
    const [ loading, setLoading] = useState(false);
    const [ loadingSpecificDateSlots, setLoadingSpecificDateSlots] = useState(false);
    const [ selectedDateToBeOverrided, setSelectedDateToBeOverrided] = useState(new Date());

    function initializeWeekDays() {
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
    }, []);

    useEffect(() => {
        if(weekDays != null) {
            console.log("weekDays change", weekDays, selectedDateToBeOverrided);


            const withDate = updateBarber?.barberAvailability?.filter(item => item?.barberAvailabilitiesTemplate?.hasOwnProperty('date'));

            withDate?.map( barber => {
                const slots = barber?.barberAvailabilitiesTemplate?.timeSlots;
                overrideDates[barber?.barberAvailabilitiesTemplate?.date] = slots;
            });
        }

    }, [weekDays]);

    useEffect(() => {

        async function updateData() { 

            if(weekDays != null) {
                //add these slots to the override dates now .... 
                //lets first check if there are already items in there? if there are we don't want to replace them
                let nameOfTheSelectedDate = dayNames[new Date(selectedDateToBeOverrided).getDay()].toUpperCase();
                let slotsForSelectedDate = weekDays[nameOfTheSelectedDate];

                let currentOverrideKey = formatDateAsServerDate(new Date(selectedDateToBeOverrided));
                console.log("overrideDates ", overrideDates[currentOverrideKey]);
                console.log("slotsForSelectedDate ", slotsForSelectedDate);

                //Either override dates will have items in it or not
                //slotsForSelected date only has items that belong to the date based on day of the week
                //Rule
                //if date does not have any items, then fill it with the data from slots for selected Date 
                //if date has items, only show those items

                if(Array.isArray(overrideDates[currentOverrideKey]) && overrideDates[currentOverrideKey].length > 0) {}
                else {
                    updateOverrideDatesArray(currentOverrideKey, slotsForSelectedDate);
                    console.log("overrideDates ", overrideDates[currentOverrideKey]);
                }

                onOverrideDatesUpdate(overrideDates);
            }
        }

        updateData();
        
    }, [selectedDateToBeOverrided]);


    useEffect(() => {
        onOverrideDatesUpdate(overrideDates);
    }, [overrideDates]);

    function addShift() {
        const createdSlot = createEmptySlot(formatDateAsServerDate(selectedDateToBeOverrided));
        updateOverrideDates(formatDateAsServerDate(selectedDateToBeOverrided), createdSlot);
    }

    function updateOverrideDates(selectedDate, newShift) {

        setOverrideDates(prevDates => {
            const updatedDates = { ...prevDates };

            if (updatedDates[selectedDate]) {
                console.log("if true ", selectedDate, updatedDates, updatedDates[selectedDate], newShift);
                updatedDates[selectedDate] = [...updatedDates[selectedDate], newShift];
            } else {
                console.log("if false ", selectedDate, updatedDates, updatedDates[selectedDate], newShift);
                updatedDates[selectedDate] = [newShift];
            }
    
            return updatedDates;
        });
    };

    const updateOverrideDatesArray = (currentOverrideKey, slotsForSelectedDate) => {
        // Create a new object with all old keys and the updated/added key
        setOverrideDates(prevOverrideDates => ({
            ...prevOverrideDates,
            [currentOverrideKey]: slotsForSelectedDate
        }));
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



    const createEmptySlot = (selectedDate) => {
        return {
            attendanceStatus: "TO_BE_MARKED",
            slotName : dayNames[new Date(selectedDate).getDay()],
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

    const createSlotWithStartEndDatetime = (selectedDate, startDateTime, endDateTime) =>{
        return {
            isChanged: true,
            attendanceStatus: "TO_BE_MARKED",
            slotName : dayNames[new Date(selectedDate).getDay()],
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

    function removeSlotFromDate(date, index) {
        console.log("removeSlotFromDate ", date, index);

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

    const updateSlotTime = (selectedDateKey, index, newTime)  =>  {
        let startTime = moment(newTime[0], 'hh:mm a');
        let endTime = moment(newTime[1], 'hh:mm a');

        overrideDates[selectedDateKey][index] = createSlotWithStartEndDatetime(selectedDateKey, startTime, endTime);
    }

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
                                                {
                                                Object.entries(overrideDates).map(([dateKey, slots]) => {
                                                    if (dateKey === formatDateAsServerDate(selectedDateToBeOverrided)) {
                                                        return slots.length > 0 ? (
                                                            slots.map((slot, index) => (
                                                                <div key={index} className="slot-container">
                                                                    <TimeInputRange
                                                                        format="12"
                                                                        value={slotToStartAndEndDateTimeArray(slot)}
                                                                        onChange={(newTime) => updateSlotTime(dateKey, index, newTime)}
                                                                    />
                                                                    <button className='slots-delete-icon'>
                                                                        <FontAwesomeIcon icon={faTrash} onClick={() => removeSlotFromDate(dateKey, index)} />
                                                                    </button>
                                                                </div>
                                                            ))
                                                        ) : (
                                                            <p className="no-availability slot">N/A</p>
                                                        );
                                                    }
                                                    return null;
                                                })
                                            }
                                            </div>
                                        )}
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
