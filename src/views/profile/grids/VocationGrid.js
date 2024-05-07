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
import useVocationService from 'utils/hooks/CustomServices/useVocationService';
import VocationCard from './VocationCard';
import useBookingServices from 'utils/hooks/useBookingService'
import Select from 'components/ui/Select'
import { Loading } from 'components/shared';


const VocationGrid = () => {
    //Alert
    const [serverError, setServerError] = useState(false);
    const [serverErrorMessage, setServerErrorMessage] = useState(false);

    const handleAlertClose = () => {
        setServerError(false);
        setServerErrorMessage('');
    }

    //Grabbing all the holidays
    const { getBarbers } = useBookingServices();
    const { getVocations, addVocation, deleteVocation } = useVocationService();
    const [vocations, setVocations] = useState([]); // Initial state as an empty array
    const [barbers, setBarbers] = useState([]);

    const [selectedBarber, setSelectedBarber] = useState(null);

    const fetchVocations = async () => {
        setLoading(true);
        const response = await getVocations();
        if(response.status == -1) {
            //error
            setServerError(true);
            setServerErrorMessage(response.message);
        }
        else {
            setVocations(response);
        }

        setLoading(false);
    };

    const fetchBarbers = async () => {
        setLoading(true);
        const data = await getBarbers();
        setBarbers(data);
        setLoading(false);
    };

    const barbersMap = barbers.map(barber => ({
        value: barber.firstName + " " + barber.lastName,
        label: barber.firstName + " " + barber.lastName,
        barberId: barber.barberId
    }));
    
    useEffect(() => {
        fetchVocations();
        fetchBarbers();
    }, []);


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

        values.barberId = selectedBarber.barberId;
        values.barberName = selectedBarber.value;

        console.log("sending values ", values);

        //lets make call to server
        const response = await addVocation(values);
        if(response.status === -1) {
            showError(response.message);
        }
        else {
            fetchVocations();
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
    const [clientSearchableIdForDeletion, setClientSearchableIdForDeletion] = useState(null);

    const handleDelete = async(clientSearchableId) => {
        setClientSearchableIdForDeletion(clientSearchableId);
        setIsDeleteDialogOpen(true);
    };

    const onDeleteDialogClose =() => {
        setClientSearchableIdForDeletion(null);
        setIsDeleteDialogOpen(false);
    }

    const onDeleteDialogOk = async () => {
        setIsDeleteDialogOpen(false);
         const response = await deleteVocation(clientSearchableIdForDeletion);

        if(response.status === -1) {
            showError(response.message);
        }
        else {
            fetchVocations();
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


            <Loading loading={loading}> 
                <div className='right-column' style={{marginRight : '50px'}}>
                    <ButtonWithIcon label="Add Time off" onClick={handleClickToOpen} />
                </div>
                
                <div className="grid-view">
                    {vocations.map((vocation) => (
                        <VocationCard 
                            key={vocation.clientSearchableId} 
                            vocation={vocation} 
                            onDelete={handleDelete} 
                        />
                    ))}
                </div>
            </Loading>
            <div stlye={{}}>
                <Dialog isOpen={open} onClose={handleToClose} 
                    PaperProps={{
                        style: {
                            minWidth: '400px', // Your desired minimum width
                            maxWidth: '600px', // Your desired maximum width
                        },
                    }}> 
                        <DialogTitle>{"Add Vocation"}</DialogTitle>
                        <DialogContent>

                            <Formik
                                initialValues={{
                                    name: ''
                                }}
                                onSubmit={async (values) => {
                                    // await new Promise((r) => setTimeout(r, 500))
                                    // alert(JSON.stringify(values, null, 2))
                                }}
                            >
                                {({ values, touched, errors, resetForm}) => (
                                    <div>
                                <Form>
                                    <FormContainer >
                                        
                                    <FormItem
                                        label="Select Barber You are adding Vocation For"
                                        invalid={errors.barbers && touched.barbers}
                                        errorMessage={errors.barbers}
                                    >
                                        <Select
                                            placeholder="Please Select"
                                            options={barbersMap}
                                            onChange={(selectedOption) => {
                                                setSelectedBarber(selectedOption);
                                            }}/>

                                    </FormItem>
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

export default VocationGrid;
