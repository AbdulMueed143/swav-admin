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



export default function AddShiftDialog({open, onClose, onUpdate}) {

 
    //Shift Add Functionality
    const [dialogIsOpen, setIsOpen] = useState(false);
    const [startTime, setStartTime] = useState(moment().format('HH:mm'));
    const [endTime, setEndTime] = useState(startTime);

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

          
        </div>
    );
}
