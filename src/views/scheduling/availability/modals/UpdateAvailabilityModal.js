import React, { useState, useEffect,  useRef } from 'react';
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Button from "@mui/material/Button";
import moment, { weekdays } from 'moment';
import { TimePicker } from 'antd';
import useAvailabilityService from 'utils/hooks/CustomServices/useAvailabilityService';

import { FormItem, FormContainer } from 'components/ui'
import Input from 'components/ui/Input'
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import AddShiftDialog from './AddShiftDialog';
// Example with FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { Loading } from 'components/shared';


export default function UpdateAvailabilityModal({updateBarber, open, handleClose, handleUpdate}) {

    const {  updateBarberAvailability  } = useAvailabilityService();
    const [loading, setLoading] = useState(false);

    // const { barberId, firstName, lastName, email, barberAvailability, about, status } = updateBarber;
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

        const initialWeekDays = { ...defaultWeekDays };

        // Iterate over each day of the week
        for (const day in initialWeekDays) {
            updateBarber?.barberAvailability?.map( barber => {
                if(barber?.barberAvailabilitiesTemplate?.dayOfWeek == day) {
                    //get all the timeslots 
                    const slots = barber?.barberAvailabilitiesTemplate?.timeSlots;
                    initialWeekDays[day] = slots;
                }
            });
        }
        return initialWeekDays;
    };

    const [weekDays, setWeekDays] = useState(null);

    useEffect(() => {
        if (open) {
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
        }
    }, [open]); // Empty dependency array means the effect will only run once


    function slotToString(slot) {

        var startTimeAmPM = "am";
        var endTimeAmPM = "am";

        if(slot.startTime.hour >= 12)
            startTimeAmPM = "pm";

        if(slot.endTime.hour >= 12)
            endTimeAmPM = "pm";


        return `${slot.startTime.hour}:${slot.startTime.minute}${startTimeAmPM} - ${slot.endTime.hour}:${slot.endTime.minute}${endTimeAmPM}` 
    }


    //Shift Add Functionality
    const [dialogIsOpen, setIsOpen] = useState(false);
    const [selectedDay, setSelectedDay] = useState(null);
    const [startTime, setStartTime] = useState(moment().format('HH:mm'));
    const [endTime, setEndTime] = useState(startTime);
    
    const openDialog = (day) => {
        setIsOpen(true);
        console.log("dialogIsOpen " , dialogIsOpen);

        if(day != undefined && day != null)
            setSelectedDay(day);

        setStartTime(moment().format('HH:mm'));
        setEndTime(moment().format('HH:mm'));
    }


    const onDialogClose = () => {
        setIsOpen(false)
        // setSelectedDay(null);
        setStartTime(moment().format('HH:mm'));
        setEndTime(moment().format('HH:mm'));
    }

    const createSlot = (day, selectedStartTime, selectedEndTime) =>{
        return {
            attendanceStatus: "TO_BE_MARKED",
            slotName : day,
            startTime : {
                hour : selectedStartTime.hour(),
                minute :  selectedStartTime.minute()
            },
            endTime : {
                hour : selectedEndTime.hour(),
                minute : selectedEndTime.minute()
            }
        }
    }

    const addObjectToDay = (selectedDay, newSlot) => {

        for (const day in weekDays) {
            if(day== selectedDay) {
                //get all the timeslots 
                weekDays[selectedDay].push(newSlot);
            }
        }
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
    
    const onDialogOk = () => {
        setIsOpen(false)
        const selectedStartTime = moment(startTime, 'HH:mm');
        const selectedEndTime = moment(endTime, 'HH:mm');

        const createdSlot = createSlot(selectedDay, selectedStartTime, selectedEndTime);
        addObjectToDay(selectedDay, createdSlot);

        setStartTime(null);
        setEndTime(null);
    }

    const save = async () => {
        //we got to save days for each day 
        console.log("Saving ", weekDays)

        const availabilities =  Object.keys(weekDays).map(day => {
            return {
                dayOfWeek: day,
                timeSlots: weekDays[day]
            };
        });

        setLoading(true);
        const result = await updateBarberAvailability(updateBarber.barberId, availabilities);

        if(result.status == -1) {
            console.log("Failed ", );
        } else {
            console.log("Succeess", );
        }

        //close this by calling
        handleUpdate();
        setLoading(false);
        
    }
    

    const formIkRef = useRef();

    return (
        <div stlye={{}}>

            <div>

            <Dialog open={open} onClose={handleClose}  fullWidth={true}
                PaperProps={{
                    style: {
                        minWidth: '500px', // Your desired minimum width
                        maxWidth: '90%', // Your desired maximum width
                        minHeight: '400px',
                        zIndex: 100
                    },
                }}> 
                <DialogTitle>{updateBarber?.firstName} {updateBarber?.lastName} {"Availability"}</DialogTitle>
                <DialogContent>
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
                                            <h6>{day}</h6>
                                            {slots.length > 0 ? (
                                                slots.map((slot, index) => (
                                                    <div key={index} className="slot-container">
                                                        <p className="slot">{slotToString(slot)}</p>
                                                        <button className='slots-delete-icon ' onClick={() => removeSlotFromDay(day, index)}>
                                                            <FontAwesomeIcon icon={faTrash} />
                                                        </button>  
                                                    </div>
                                                ))
                                            ) : (
                                                <p className="no-availability slot">N/A</p>
                                            )}
                                            <Button className="add-btn"onClick={() => openDialog(day)}>Add</Button>
                                        </div>
                                    ))
                                )}
                                </div> 

                     </FormContainer>
                            </Form>

                            <DialogActions>
                                <Button onClick={handleClose}
                                    color="primary">
                                    Cancel
                                </Button>
                                <Button onClick={() => save()}
                                    color="primary">
                                    Save
                                </Button> 

                                <Loading loading={loading} >
                                </Loading>
                            </DialogActions>
                        </div>
                    )}
                </Formik>
      
                <Dialog
                    open={dialogIsOpen}
                    PaperProps={{
                        style: {
                            minWidth: '300px', // Your desired minimum width
                            maxWidth: '60%', // Your desired maximum width
                            minHeight: '400px',
                            zIndex: 100
                        },
                    }}
                    contentClassName="pb-0 px-0"
                    onClose={()=>onDialogClose()}
                    onRequestClose={()=>onDialogClose()}
                >
                <div className="px-6 pb-6">
                    <h5 className="mb-4">Add Shift</h5>
                    <div>
                            <p>Start Time:</p>
                            <TimePicker 
                            getPopupContainer={(triggerNode) => {
                                return triggerNode.parentNode.parentNode.parentNode;
                            }}
                                 format="HH:mm" 
                                 onChange={(time) => setStartTime(time ? time.format('HH:mm') : null)} 
                                 minuteStep={15}

                            />
                        <p>End Time:</p>
                        <TimePicker 
                        
                            getPopupContainer={(triggerNode) => {
                                return triggerNode;
                            }}
                            format="HH:mm" 
                            onChange={(time) => setEndTime(time ? time.format('HH:mm') : null)} 
                            minuteStep={15}

                        />
                    </div>
                </div>
                    <div className="text-right px-6 py-3 bg-gray-100 dark:bg-gray-700 rounded-bl-lg rounded-br-lg">
                        <Button
                            className="ltr:mr-2 rtl:ml-2"
                            onClick={()=>onDialogClose()}
                        >
                            Cancel
                        </Button>
                        <Button variant="solid" onClick={()=> onDialogOk()}>
                            Okay
                        </Button> 
                    </div>
                </Dialog> 

                </DialogContent>
          
                
            </Dialog>
            </div>

        </div>
    );
}
