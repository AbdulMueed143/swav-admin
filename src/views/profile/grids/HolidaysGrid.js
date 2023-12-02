import React,  { useState, useRef, useEffect } from 'react'

import HolidayCard from './HolidayCard';
import { Field, Form, Formik, useFormikContext, FormikStep } from 'formik'
import { Input, Button, FormItem, FormContainer, Alert } from 'components/ui'
import { Dialog } from 'components/ui';
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import moment from 'moment';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.module.css';
import ButtonWithIcon from 'components/ui/custom/barbers/ButtonWithIcon';
import useHolidaysService from 'utils/hooks/CustomServices/useHolidayService';


const HolidayGrid = () => {
    //Alert
    const [serverError, setServerError] = useState(false);
    const [serverErrorMessage, setServerErrorMessage] = useState(false);

    const handleAlertClose = () => {
        setServerError(false);
        setServerErrorMessage('');
    }

    //Grabbing all the holidays
    const { getHolidays, addHoliday, deleteHoliday } = useHolidaysService();
    const [holidays, setHolidays] = useState([]); // Initial state as an empty array

    const fetchHolidays = async () => {
        setLoading(true);
        const response = await getHolidays();
        if(response.status == -1) {
            //error
            setServerError(true);
            setServerErrorMessage(response.message);
        }
        else {
            setHolidays(response);
        }

        setLoading(false);
    };
    
    useEffect(() => {
        fetchHolidays();
    }, []); // Empty dependency array means the effect will only run once


    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);


    const handleClickToOpen = () => {
        setOpen(true);
    };
 
    const handleToClose = () => {
        setOpen(false);
    };

    const handleToSave = async(values)  => {

        const startDateAsMoment = moment(startDate);
        const endDateAsMoment = moment(endDate);

        values.startDate = {
            day : startDateAsMoment.date(),
            month : startDateAsMoment.month() + 1,
            year :  startDateAsMoment.year()
        }

        values.endDate = {
            day : endDateAsMoment.date(),
            month : endDateAsMoment.month() + 1,
            year :  endDateAsMoment.year()
        }

        //lets make call to server
        const response = await addHoliday(values);
        if(response.status === -1) {
            showError(response.message);
        }
        else {
            fetchHolidays();
        }

        //reset dates
        resetDatePickerDates();
        setOpen(false);
    }

    
    //Show Hide Error
    const showError = (message) => {
        setServerError(true);
        setServerErrorMessage(message);
    }

    const hideError = () => {
        setServerError(false);
        setServerErrorMessage('');
    }

    //Reset Date Picker
    const resetDatePickerDates = () => {
        setStartDate(null);
        setEndDate(null);
    }
    //End of saving

    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    //Deleting holiday
    const [deleteDialogIsOpen, setIsDeleteDialogOpen] = useState(false)
    const [holidayIdSelected, setHolidayIdSelected] = useState(null);

    const handleDelete = async(holidayId) => {
        setHolidayIdSelected(holidayId);
        setIsDeleteDialogOpen(true);
    };

    const onDeleteDialogClose =() => {
        setHolidayIdSelected(null);
        setIsDeleteDialogOpen(false);
    }

    const onDeleteDialogOk = async () => {
        setIsDeleteDialogOpen(false);
         const response = await deleteHoliday(holidayIdSelected);

        if(response.status === -1) {
            showError(response.message);
        }
        else {
            fetchHolidays();
        }
    }
    //Delete method

    return (

        <div>

            {serverError && (
             <div>
                <Alert showIcon onClose={handleAlertClose} type="danger" title="Error!">
                    {serverErrorMessage}
                </Alert>
            </div>
            )}


            <div className='right-column' style={{marginRight : '50px'}}>
                <ButtonWithIcon label="Add Holiday"  onClick={handleClickToOpen} />
            </div>
            
            <div className="grid-view">
                {holidays.map((holiday) => (
                    <HolidayCard 
                        key={holiday.id} 
                        holiday={holiday} 
                        onDelete={handleDelete} 
                    />
                ))}
            </div>

            <div stlye={{}}>
            <Dialog open={open} onClose={handleToClose}  fullWidth={true}
            PaperProps={{
                style: {
                    minWidth: '400px', // Your desired minimum width
                    maxWidth: '600px', // Your desired maximum width
                },
            }}> 
                <DialogTitle>{"Add Holiday"}</DialogTitle>
                    <DialogContent>

                        <Formik
                            initialValues={{
                                name: '',
                                description : ''
                            }}
                            onSubmit={async (values) => {
                                await new Promise((r) => setTimeout(r, 500))
                                alert(JSON.stringify(values, null, 2))
                            }}
                        >
                             {({ values, touched, errors, resetForm}) => (
                                <div>
                            <Form>
                                <FormContainer >
                                    <FormItem label="Holiday Name">
                                        <Field
                                            type="text"
                                            name="name"
                                            placeholder="Please enter holiday name."
                                            component={Input}
                                        />
                                    </FormItem>
                                    <FormItem label="Select Date/Dates for Holidays">
                                    <DatePicker
                                        selected={startDate}
                                        onChange={(dates) => {
                                            const [start, end] = dates;
                                            setStartDate(start);
                                            setEndDate(end);
                                        }}
                                        startDate={startDate}
                                        endDate={endDate}
                                        selectsRange
                                        inline
                                    />
                                    </FormItem>
                                </FormContainer>
                            </Form>

                            <DialogActions>
                            <Button onClick={handleToClose} color="primary">
                                Cancel
                            </Button>
                            <Button  onClick={() => handleToSave(values)} color="primary">
                                Save
                            </Button>

                        </DialogActions>
                        </div>
                )}
                        </Formik>

                    </DialogContent>
            </Dialog>
            </div>

            <Dialog
                isOpen={deleteDialogIsOpen}
                onClose={onDeleteDialogClose}
                onRequestClose={onDeleteDialogClose}
            >
                <h5 className="mb-4">Deleting Service</h5>
                <p>
                    Are you sure you want to delete this service?
                </p>
                <div className="text-right mt-6">
                    <Button
                        className="ltr:mr-2 rtl:ml-2"
                        variant="plain"
                        onClick={onDeleteDialogClose}
                    >
                        Cancel
                    </Button>
                    <Button variant="solid" onClick={onDeleteDialogOk}>
                        Okay
                    </Button>
                </div>
            </Dialog>


        </div>

    );
};

export default HolidayGrid;
