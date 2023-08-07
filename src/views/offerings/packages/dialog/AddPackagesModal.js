import React, { useState,useEffect } from 'react';
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";
import TextField from '@material-ui/core/TextField';
import { Grid, Typography } from '@material-ui/core';


import { FormItem, FormContainer } from 'components/ui'
import Input from 'components/ui/Input'
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import { Autocomplete } from '@material-ui/lab';

const validationSchema = Yup.object().shape({
    // input: Yup.string()
    //     .min(3, 'Too Short!')
    //     .max(20, 'Too Long!')
    //     .required('Please input user name!'),
    // cost: Yup
    //     .number()
    //     .required("Cost is required")
    //     .positive("Cost should be a positive number")
    //     .integer("Cost should be an integer"),
    // duration: Yup
    //     .number()
    //     .required("Duration is required")
    //     .positive("Duration should be a positive number")
    //     .integer("Duration should be an integer"),
})
 
export default function AddPackageModal({open, handleToClose}) {

    const services = [
        { title: 'Hair Cut', cost: 30, time: 30 },
        { title: 'Shaving', cost: 20, time: 10 },
        // add more services as necessary
      ];
      
    const [selectedServices, setSelectedServices] = useState([]);
    
    const [discount, setDiscount] = useState(0);
    const [totalTime, setTotalTime] = useState(0);
    const [totalCost, setTotalCost] = useState(0);

    // useEffect(() => {
    //     setTotalTime(selectedServices.reduce((total, service) => total + service.time, 0));
    //     setTotalCost(selectedServices.reduce((total, service) => total + service.cost, 0));
    //     return (values) => {
    //         const discountPercentage = values.discount / 100;
    //         const discountAmount = totalCost * discountPercentage;
    //         setDiscount(totalCost - discountAmount);
    //     }
    // }, [selectedServices]);

    return (
        <div stlye={{}}>
            <Dialog open={open} onClose={handleToClose}  fullWidth={true}
            PaperProps={{
                style: {
                    minWidth: '400px', // Your desired minimum width
                    maxWidth: '600px', // Your desired maximum width
                },
                }}> 

                <DialogTitle>{"Add Package"}</DialogTitle>

                <DialogContent>

                <Formik
                    enableReinitialize
                    initialValues={{
                        packageName: '',
                        description: '',
                        price: 0,
                        averageTimeInMinutes: 0,
                        properties : {}
                    }}
                    validationSchema={validationSchema}
                    onSubmit={(values, { setSubmitting }) => {
                        setSubmitting(false);
                        
                    }}
                    // innerRef={formIkRef}

                >

                    {({ values, touched, errors, resetForm, submitForm }) => (
                        <div>
                            <Form>
                                <FormContainer>
                                 
                                <FormItem
                                        asterisk
                                        label="Pacakge Name"
                                        invalid={errors.packageName && touched.packageName}
                                        errorMessage={errors.packageName}
                                    >
                                        <Field
                                            type="text"
                                            name="packageName"
                                            placeholder="Package Name"
                                            component={Input}
                                        />
                                    </FormItem>

                                    <FormItem
                                            asterisk
                                            label="Discount Percentage (%)" 
                                            invalid={errors.discount && touched.discount}
                                            errorMessage={errors.discount}
                                        >
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <Field
                                                type="number"
                                                name="discount"
                                                placeholder="Discount"
                                                component={Input}
                                                inputMode="numeric"
                                                min="0"
                                                max="100"
                                                step="1.0"
                                                style={{ flex: 1 }}
                                            />
                                            <span>%</span>
                                            </div>
                                        </FormItem>

                                    <Autocomplete
                                            multiple
                                            id="select-services"
                                            options={services}
                                            getOptionLabel={(option) => `${option.title}, ${option.cost} AUD, ${option.time} Mint`}
                                            value={selectedServices}
                                            onChange={(event, newValue) => {
                                                setSelectedServices(newValue);
                                            }}
                                            renderInput={(params) => (
                                                <TextField {...params} variant="outlined" label="Services" placeholder="Services" />
                                            )}
                                        /> 



                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <div style={{ display: 'flex', flexDirection: 'column', width: '50%', paddingRight: '10px' }}>
                                                <FormItem
                                                    asterisk
                                                    label="Price"
                                                    invalid={errors.price && touched.price}
                                                    errorMessage={errors.price}
                                                >
                                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                        <Field
                                                            type="number"
                                                            name="price"
                                                            placeholder="Price"
                                                            component={Input}
                                                            inputMode="numeric"
                                                            min="0" // If you don't want negative values
                                                            step="0.1" // If you want to allow cents
                                                            style={{ flex: 1 }} // Make the input take as much space as possible
                                                        />
                                                        <span>$</span>
                                                    </div>
                                                </FormItem>
                                            </div>
                                            <div style={{ display: 'flex', flexDirection: 'column', width: '50%', paddingLeft: '10px' }}>
                                                <FormItem
                                                    asterisk
                                                    label="Duration"
                                                    invalid={errors.averageTimeInMinutes && touched.averageTimeInMinutes}
                                                    errorMessage={errors.averageTimeInMinutes}
                                                >
                                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                        <Field
                                                            type="number"
                                                            name="averageTimeInMinutes"
                                                            placeholder="Duration in minutes"
                                                            component={Input}
                                                            step="5" // If you want to allow cents
                                                            min="5" // Assuming the minimum duration is 1 minute
                                                            style={{ flex: 1 }} // Make the input take as much space as possible
                                                        />
                                                        <span>Min</span>
                                                    </div>
                                                </FormItem>
                                            </div>
                                        </div>

                                </FormContainer>
                            </Form>

                            <DialogActions>
                                <Button onClick={handleToClose}
                                    color="primary">
                                    Cancel
                                </Button>
                                <Button 
                                    color="primary">
                                    Save
                                </Button>
                            </DialogActions>
                        </div>
                    )}
                </Formik>


                    {/* <Formik
                        enableReinitialize
                        initialValues={{
                            input: '',
                            multipleSelect: [],
                            multipleCheckbox: [],
                            discount: 0,
                            packageName: "Package"
                        }}
                        validationSchema={validationSchema}
                        onSubmit={(values, { setSubmitting }) => {
                            
                        }}
                        >
                            
                            {({ values, errors, touched }) => {

                            <div>

                                <Form>
                                    <FormContainer>
                                 

                                    <Autocomplete
                                            multiple
                                            id="select-services"
                                            options={services}
                                            getOptionLabel={(option) => `${option.title}, ${option.cost} AUD, ${option.time} Mint`}
                                            value={selectedServices}
                                            onChange={(event, newValue) => {
                                                setSelectedServices(newValue);
                                            }}
                                            renderInput={(params) => (
                                                <TextField {...params} variant="outlined" label="Services" placeholder="Services" />
                                            )}
                                        />

                                        <FormItem
                                            asterisk
                                            label="Discount Percentage (%)" 
                                            invalid={errors.discount && touched.discount}
                                            errorMessage={errors.discount}
                                        >
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <Field
                                                type="number"
                                                name="discount"
                                                placeholder="Discount"
                                                component={Input}
                                                inputMode="numeric"
                                                min="0"
                                                max="100"
                                                step="1.0"
                                                style={{ flex: 1 }}
                                            />
                                            <span>%</span>
                                            </div>
                                        </FormItem>

                                        <div>
                                            <Grid container justifyContent="space-between">
                                                <Typography variant="body1">Total Time:</Typography>
                                                <Typography variant="body1">{totalTime} Mint</Typography>
                                            </Grid>

                                            <Grid container justifyContent="space-between">
                                                <Typography variant="body1">Total Cost:</Typography>
                                                <Typography variant="body1">{totalCost} AUD</Typography>
                                            </Grid>

                                            <Grid container justifyContent="space-between">
                                                <Typography variant="body1">After Discount:</Typography>
                                                <Typography variant="body1"> AUD</Typography>
                                            </Grid> 
                                        </div>

                                    </FormContainer>
                                </Form>


                                <DialogActions>
                                    <Button onClick={handleToClose}
                                        color="primary">
                                        Cancel
                                    </Button>
                                    <Button onClick={handleToClose}
                                        color="primary">
                                        Save
                                    </Button>
                                </DialogActions>

                            </div>
                        }};
                    </Formik> */}

                </DialogContent>

            </Dialog>
        </div>
    );
}
