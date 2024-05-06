import React, { useState, useEffect,  useRef, useReducer } from 'react';
import Button from "@mui/material/Button";
import useAvailabilityService from 'utils/hooks/CustomServices/useAvailabilityService';
import { slotToStartAndEndDateTimeArray, isObjectWithAtLeastOneKey } from './utils';
import { FormItem, FormContainer, Calendar } from 'components/ui'
import TimeInput from 'components/ui/TimeInput'
import { Field, Form, Formik } from 'formik'
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
    // const { barberId, firstName, lastName, email, barberAvailability, about, status } = updateBarber;

    //Variables to be used

    //Use state methods to be used
    const { updateBarberAvailability , fetchAvailabilityForDate, updateBarberAvailabilityForDate } = useAvailabilityService();
    const [ overrideDates, setOverrideDates] = useState({});
    const { TimeInputRange } = TimeInput
    const [ loading, setLoading] = useState(false);
    const [ loadingSpecificDateSlots, setLoadingSpecificDateSlots] = useState(false);
    const [ selectedDateToBeOverrided, setSelectedDateToBeOverrided] = useState(new Date());

    const initializeWeekDays = () => {
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
                console.log("we have shifts for this date ", foundItem);
            } else {
                let nameOfTheSelectedDate = dayNames[new Date(dateLookingFor).getDay()].toUpperCase();
                let slotsForSelectedDate = weekDays[nameOfTheSelectedDate];

                //add these slots to the override dates now
                overrideDates[formatDateAsServerDate(new Date(dateLookingFor))] = slotsForSelectedDate;

            }
        };
    
        fetchData().catch(console.error); // Call the async function and handle any errors
    }, [selectedDateToBeOverrided]);

    function addShift() {
        const createdSlot = createEmptySlot(formatDateAsServerDate(selectedDateToBeOverrided));
        updateOverrideDates(formatDateAsServerDate(selectedDateToBeOverrided), createdSlot);
    }

    function updateOverrideDates(selectedDate, newShift) {

        console.log("Selected Date ", overrideDates, selectedDate, newShift);


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
