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
import useBookingServices from 'utils/hooks/useBookingService'
import Select from 'components/ui/Select'

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
 
export default function UpdatePackageModal({packageData,servicesAvailable, open,handleToSave, handleToClose}) {

    const { getServices } = useBookingServices();
    // const [services, setServices] = useState(servicesAvailable); // Initial state as an empty array
    const [selectedAmenities, setSelectedAmenities] = React.useState([]);

    //  // Define a function to fetch and update the services
    //  const fetchServices = async () => {
    //     const data = await getServices();
    //     setServices(data);

    //     //you match them with the 
    //     const sel = data.filter(service=> packageData.amenitiesIds.includes(service.id));
    //     setSelectedAmenities(sel);
    // };


    // useEffect(() => {
    //     // Call fetchServices on component mount
    //     fetchServices();
    // }, []); // Empty dependency array means the effect will only run once

      
    // Map your services array to an array of options
    const serviceMap = servicesAvailable.map(service => ({
        value: service.name,
        label: service.name + " ( " + service.price + " AUD, " +service.averageTimeInMinutes + " Minutes ) ",
    }));

      
    // const [selectedServices, setSelectedServices] = useState([]);
    const [totalTime, setTotalTime] = useState(0);
    const [totalCost, setTotalCost] = useState(0);
    const [discountedCost, setDiscountedCost] = useState(0);


    useEffect(() => {

        if(selectedAmenities) {
            setTotalTime(selectedAmenities.reduce((total, service) => total + service.averageTimeInMinutes, 0));
            setTotalCost(selectedAmenities.reduce((total, service) => total + service.price, 0));
            setDiscountedCost(totalCost);
        }

    }, [selectedAmenities]);

    const handleChange = (values) => {

        // console.log("Services A");
        // console.log(services);

        if(values.discountPercentage > 0 && values.discountPercentage < 100) {
            const discount = totalCost * (values.discountPercentage/100);
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

                <DialogTitle>{"Update Package"}</DialogTitle>

                <DialogContent>

                <Formik
                    enableReinitialize
                    initialValues={{
                        discountPercentage : packageData == null? '': packageData.discountPercentage,
                        name: packageData == null? '': packageData.name,
                        amenities: selectedAmenities,
                        description: packageData == null? '': packageData.description,
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
                                        invalid={errors.name && touched.name}
                                        errorMessage={errors.name}
                                    >
                                        <Field
                                            type="text"
                                            name="name"
                                            placeholder="Package Name"
                                            component={Input}
                                        />
                                    </FormItem>

                                    <FormItem
                                        asterisk
                                        label="Pacakge Description"
                                        invalid={errors.description && touched.description}
                                        errorMessage={errors.description}
                                    >
                                        <Field
                                            type="text"
                                            name="description"
                                            placeholder="Package Description"
                                            component={Input}
                                        />
                                    </FormItem>


                                <FormItem
                                    label="Services"
                                    invalid={errors.amenities && touched.amenities}
                                    errorMessage={errors.amenities}
                                >
                               
                                    <Select
                                        isMulti
                                        placeholder="Please Select"
                                        defaultValue={serviceMap}
                                        options={serviceMap}
                                        onChange={(selectedOptions) => {
                                            // Get selected amenities from services list using the selected names
                                            const selectedAmenities = selectedOptions.map(option => {
                                                return servicesAvailable.find(service => service.name === option.value);
                                            });

                                            setSelectedAmenities(selectedAmenities);
                                    
                                        }}
                                    />
                                </FormItem>

                                  
                                    
                                  {/* <Autocomplete
                                            multiple
                                            id="select-services"
                                            options={services}
                                            getOptionLabel={(option) => `${option.title}, ${option.cost} AUD, ${option.time} Mint`}
                                            value={selectedAmenities}
                                            onChange={(event, newValue) => {
                                                setSelectedAmenities(newValue);
                                            }}
                                            renderInput={(params) => (
                                                <TextField {...params} variant="outlined" label="Services" placeholder="Services" />
                                            )}
                                        />   */}

                            <FormItem
                            asterisk
                                label="Discount Percentage (%)"
                                invalid={errors.discountPercentage && touched.discountPercentage}
                                errorMessage={errors.discountPercentage}
                                >
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Field
                                    type="number"
                                    name="discountPercentage"
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
                                <Button onClick={() => handleToSave(values, selectedAmenities)} color="primary">
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
