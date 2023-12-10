import React, { useState, useEffect,  useRef } from 'react';
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Button from "@mui/material/Button";
import moment, { weekdays } from 'moment';
import { TimePicker } from 'antd';

import { FormItem, FormContainer } from 'components/ui'
import Input from 'components/ui/Input'
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import AddShiftDialog from './AddShiftDialog';



export default function UpdateAvailabilityModal({updateBarber, open, handleClose, handleUpdate}) {

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

        console.log("defaultWeekDays ", defaultWeekDays);

        const initialWeekDays = { ...defaultWeekDays };

        // Iterate over each day of the week
        for (const day in initialWeekDays) {
            // Check if the day exists in the barberAvailabilityTemplate and is an array
            console.log("day ", day);

            updateBarber?.barberAvailability?.map( barber => {
                if(barber?.barberAvailabilitiesTemplate?.dayOfWeek == day) {
                    //get all the timeslots 
                    const slots = barber?.barberAvailabilitiesTemplate?.timeSlots;
                    initialWeekDays[day].push(slots)
                }
            });
        }
        return initialWeekDays;
    };

    const [weekDays, setWeekDays] = useState(null);

    useEffect(() => {
        if (open) {
            console.log("Modal opened - setting week days");
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


    // useEffect(()=> {
    //     //When week days change we want to fill the items below ... :) 
    //     console.log("Week Days have changed ", weekDays);
        
    // }, [weekDays]);


    function slotToString(slots) {
        
        const slotString = slots.length > 0 ? slots.map( slot => { 
            var startTimeAmPM = "am";
            var endTimeAmPM = "am";

            if(slot.startTime.hour >= 12)
                startTimeAmPM = "pm";

            if(slot.endTime.hour >= 12)
                endTimeAmPM = "pm";


            return `${slot.startTime.hour}:${slot.startTime.minute}${startTimeAmPM} - ${slot.endTime.hour}:${slot.endTime.minute}${endTimeAmPM}` 
        }).join(', ') : 'N/A';
        return `${slotString}`;
    }


    //Shift Add Functionality
    const [dialogIsOpen, setIsOpen] = useState(false);
    const [selectedDay, setSelectedDay] = useState(null);
    const [startTime, setStartTime] = useState(moment().format('HH:mm'));
    const [endTime, setEndTime] = useState(startTime);
    
    const openDialog = (day) => {

        console.log("Open Dialog Clicked");
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


        const onDialogOk = () => {

        setIsOpen(false)
        const selectedStartTime = moment(startTime, 'HH:mm');
        const selectedEndTime = moment(endTime, 'HH:mm');

        // if(currentDaySelected) {

        //     //first we check if we already have atleast 1 value in template?
        //     //if yes we do following
        //     const hasSelectedDay = editBarber?.barberAvailability?.find(item => {
        //         if(item?.barberAvailabilitiesTemplate?.dayOfWeek == currentDaySelected)
        //             return true;

        //         return false;
        //     });

        //     if(hasSelectedDay) {
        //         addStartTimeAndEndTimeToEditBarber(selectedStartTime, selectedEndTime);
        //     }
        //     else {
        //         //but add empty array to fill for the day ...
        //         addEmptyDayOfWeek(currentDaySelected);
        //         //then and this 
        //         addStartTimeAndEndTimeToEditBarber(selectedStartTime, selectedEndTime);
        //     }
         
        // }
        // else {
        //     //technically there should be error dialog
        //     console.log("There should have been selected day");
        // }

        setStartTime(null);
        setEndTime(null);
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
                                                slots.map((slot, index) => <p key={index} className="slot">{slotToString(slot)}</p>)
                                            ) : (
                                                <p className="no-availability slot">N/A</p>
                                            )}
                                            <Button className="add-btn"onClick={() => openDialog()}>Add</Button>
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
                                <Button onClick={() => handleUpdate(values)}
                                    color="primary">
                                    Save
                                </Button> 
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
