import React, { useState,useEffect } from 'react';
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Button from "@mui/material/Button";
import TextField from '@mui/material/TextField';


import { FormItem, FormContainer } from 'components/ui'
import Input from 'components/ui/Input'
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import { Autocomplete } from '@mui/lab';

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
    
    const [totalTime, setTotalTime] = useState(0);
    const [totalCost, setTotalCost] = useState(0);
    const [discountedCost, setDiscountedCost] = useState(0);


    useEffect(() => {

        if(selectedServices) {
            setTotalTime(selectedServices.reduce((total, service) => total + service.time, 0));
            setTotalCost(selectedServices.reduce((total, service) => total + service.cost, 0));
            setDiscountedCost(totalCost);
        }

    }, [selectedServices]);

    const handleChange = (values) => {
        if(values.discount > 0 && values.discount < 100) {
            const discount = totalCost * (values.discount/100);
            setDiscountedCost(totalCost - discount); 
        }    
    };


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
                        discount : '',
                        packageName: '',
                        packageDescription: '',
                        properties : {}
                    }}
                    validationSchema={validationSchema}
                    onSubmit={(values, { setSubmitting }) => {
                        setSubmitting(false);
                        
                    }}
                    // innerRef={formIkRef}

                >

                    {({ values, touched, errors, resetForm, submitForm}) => (
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
                                        label="Pacakge Description"
                                        invalid={errors.packageDescription && touched.packageDescription}
                                        errorMessage={errors.packageDescription}
                                    >
                                        <Field
                                            type="text"
                                            name="packageDescription"
                                            placeholder="Package Description"
                                            component={Input}
                                        />
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
                                    style={{ flex: 1 }}
                                    />
                                    <span>%</span>
                                    <Button className="mr-2 mb-2" variant="twoTone" color="green-600" onClick={() => handleChange(values)}>
                                        Add Discount
                                    </Button>
                                </div>
                            </FormItem>




                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        

                                        <span>
                                        <h6 className="text-sm">Total</h6>
                                            <span className="text-xs"> <p>{totalCost} AUD, {totalTime} Mint</p></span>
                                        </span>

                                        <span>
                                        <h6 className="text-sm">Discounted Cost</h6>
                                            <span className="text-xs">{discountedCost} AUD</span>
                                        </span>
                            
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


                </DialogContent>

            </Dialog>
        </div>
    );
}
