import React, { useState, useEffect,  useRef } from 'react';
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import moment, { weekdays } from 'moment';
import useAvailabilityService from 'utils/hooks/CustomServices/useAvailabilityService';
import { slotToStartAndEndDateTimeArray, isObjectWithAtLeastOneKey } from './utils';
import { FormItem, FormContainer, Calendar } from 'components/ui'
import TimeInput from 'components/ui/TimeInput'
import { Field, Form, Formik } from 'formik'
import dayjs from 'dayjs'


// Example with FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { Loading } from 'components/shared';


export default function EditTemplate({updateBarber, onWeekDaysDataUpdate, initialState}) {

    const {  updateBarberAvailability , fetchAvailabilityForDate, updateBarberAvailabilityForDate } = useAvailabilityService();
    const [ overrideDates, setOverrideDates] = useState({});
    const { TimeInputRange } = TimeInput

    const [loading, setLoading] = useState(false);
    const [selectedDateToBeOverrided, setSelectedDateToBeOverrided] = useState(new Date());
    const shortMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const [weekDays, setWeekDays] = useState(null);

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
    
                withDate?.map( barber => {
                    //get all the timeslots 
                    const slots = barber?.barberAvailabilitiesTemplate?.timeSlots;
                    overrideDates[barber?.barberAvailabilitiesTemplate?.date] = slots;
                });
            
        };
    
        fetchData().catch(console.error); // Call the async function and handle any errors
    }, [selectedDateToBeOverrided, overrideDates]);

    const [defaultWeekDays, setDefaultWeekDays] = useState({
        "MONDAY": [],
        "TUESDAY": [],
        "WEDNESDAY": [],
        "THURSDAY": [],
        "FRIDAY": [],
        "SATURDAY": [],
        "SUNDAY": []
    });

    const initializeWeekDays = () => {

        console.log("What is my initial state? ", initialState, isObjectWithAtLeastOneKey(initialState));

        if(isObjectWithAtLeastOneKey(initialState)) {
            return initialState;
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


    //Methods for slots
    const updateSlotTime = (selectedDay, index, newTime)  =>  {
        //lets change the time for day at index
        for (const day in weekDays) {
            if(day == selectedDay && newTime[0] != undefined && newTime[1] != undefined) {
                let startTime = moment(newTime[0], 'hh:mm a');
                let endTime = moment(newTime[1], 'hh:mm a');
                weekDays[selectedDay][index] = createSlotWithStartEndDatetime(weekDays[selectedDay][index], startTime, endTime);
            }
        }

        onWeekDaysDataUpdate(weekDays);
    }

    const createEmptySlot = (day) =>{
        return {
            attendanceStatus: "TO_BE_MARKED",
            slotName : day,
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

    // ==== ==  = == == = == = = = 
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

                    console.log("updatedWeekDays ", updatedWeekDays);

                
                    // Add the new slot to the cloned array
                    updatedWeekDays[selectedDay] = [...updatedWeekDays[selectedDay], newSlot];
                
                    console.log("sending  updatedWeekDays ", updatedWeekDays);

                    // Return the updated state
                    return updatedWeekDays;
                  });
            }
        }

    };

    const onAddDay = (day) => {
        const createdSlot = createEmptySlot(day);
        addObjectToDay(day, createdSlot);
    }

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
                            <Form>
                                <FormContainer>
                                    <div className="schedule-container">
                                        {weekDays && (
                                            Object.entries(weekDays).map(([day, slots]) => (
                                                <div key={day}>
                                                    <h6>
                                                        <div className="header-with-button">
                                                            <span>{day}</span>
                                                            <Button className="add-btn" onClick={() => onAddDay(day)}>Add Shift</Button>
                                                        </div>
                                                    </h6>                                                    
                                                    {slots.length > 0 ? (
                                                        slots.map((slot, index) => (
                                                            <div key={index} className="slot-container">
                                                                <TimeInputRange
                                                                    format="12"
                                                                    value={slotToStartAndEndDateTimeArray(slot)}
                                                                    onChange={(newTime) => updateSlotTime(day, index, newTime)}
                                                                />
                                                                <button className='slots-delete-icon' onClick={() => removeSlotFromDay(day, index)}>
                                                                    <FontAwesomeIcon icon={faTrash} />
                                                                </button>
                                                            </div>
                                                        ))
                                                    ) : (
                                                        <p className="no-availability slot">N/A</p>
                                                    )}
                                                    
                                                </div>
                                            ))
                                            
                                        )}
                                    </div> 
                                </FormContainer>
                            </Form>
                        </div>
                    )}
                </Formik>
                
            </div>

        </div>
    );
}
