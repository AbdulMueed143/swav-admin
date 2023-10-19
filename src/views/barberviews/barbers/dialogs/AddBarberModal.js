import React, {useEffect, useState} from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Button from "@mui/material/Button";

import { FormItem, FormContainer } from 'components/ui'
import Input from 'components/ui/Input'
import { Field, Form, Formik } from 'formik'
import { useFormikContext } from 'formik';
import * as Yup from 'yup'
import Select from 'components/ui/Select'

import useBookingServices from 'utils/hooks/useBookingService'

const validationSchema = Yup.object().shape({
    input: Yup.string()
        .min(3, 'Too Short!')
        .max(20, 'Too Long!')
        .required('Please input user name!'),
    cost: Yup
        .number()
        .required("Cost is required")
        .positive("Cost should be a positive number")
        .integer("Cost should be an integer"),
    duration: Yup
        .number()
        .required("Duration is required")
        .positive("Duration should be a positive number")
        .integer("Duration should be an integer"),
})

 
export default function AddBarberModal({open, handleToSave, handleToClose}) {

    const { getServices } = useBookingServices();
    const [services, setServices] = useState([]); // Initial state as an empty array
    const [selectedAmenities, setSelectedAmenities] = React.useState([]);
    // const { setFieldValue } = useFormikContext();

    
    // Define a function to fetch and update the services
    const fetchServices = async () => {
        const data = await getServices();
        setServices(data);
        setSelectedAmenities(data);
    };
    
    useEffect(() => {
        // Call fetchServices on component mount
        fetchServices();
      }, []); // Empty dependency array means the effect will only run once
      
      // Map your services array to an array of options
    const serviceMap = services.map(service => ({
        value: service.name,
        label: service.name,
    }));

    return (
        <div stlye={{}}>
            <Dialog open={open} onClose={handleToClose}  fullWidth={true}
            PaperProps={{
                style: {
                    minWidth: '400px', // Your desired minimum width
                    maxWidth: '600px', // Your desired maximum width
                },
            }}> 
                <DialogTitle>{"Add Barber"}</DialogTitle>
                <DialogContent>

            <Formik
                enableReinitialize
                initialValues={{
                    firstName: '',
                    lastName: '',
                    phoneNumber: '',
                    email: '',
                    amenities: services,
                    about: '',
                }}
                validationSchema={validationSchema}
                onSubmit={(values, { setSubmitting }) => {
                   
                    setSubmitting(false);

                }}
            >
                {({ values, touched, errors, resetForm}) => (

                    <div>
                        <Form>
                            <FormContainer>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <FormItem
                                        
                                        label="First Name"
                                        invalid={errors.firstName && touched.firstName}
                                        errorMessage={errors.firstName}
                                    >
                                    <Field
                                    asterick
                                        type="text"
                                        autoComplete="off"
                                        name="firstName"
                                        placeholder="First Name"
                                        component={Input}

                                    />
                                </FormItem>
                                <div style={{width:"10px"}}> </div>
                                <FormItem
                                required
                                    label="Last Name"
                                    invalid={errors.lastName && touched.lastName}
                                    errorMessage={errors.lastName}
                                >
                                    <Field
                                        type="text"
                                        autoComplete="off"
                                        name="lastName"
                                        placeholder="Last Name"
                                        component={Input}
                                    />
                                </FormItem>

                                </div>

                                <FormItem
                                    asterisk
                                    label="Email"
                                    invalid={errors.email && touched.email}
                                    errorMessage={errors.email}
                                >
                                    <Field
                                        type="text"
                                        name="email"
                                        placeholder="Email"
                                        component={Input}
                                    />
                                </FormItem>

                                <FormItem
                                    asterisk
                                    label="Phone Number"
                                    invalid={errors.phoneNumber && touched.phoneNumber}
                                    errorMessage={errors.phoneNumber}
                                >
                                    <Field
                                        type="text"
                                        name="phoneNumber"
                                        placeholder="Phone Number"
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
                                                return services.find(service => service.name === option.value);
                                            });

                                            setSelectedAmenities(selectedAmenities);
                                    
                                        }}
                                    />
                                </FormItem>

                                <FormItem
                                    label="About"
                                    invalid={errors.amenities && touched.about}
                                    errorMessage={errors.about}
                                >
                                    <Field
                                        type="text"
                                        name="about"
                                        placeholder="About Barber"
                                        component={Input}
                                    />
                                </FormItem>

                            </FormContainer>
                        </Form>

                        <DialogActions>
                            <Button onClick={handleToClose} color="primary">
                                Cancel
                            </Button>
                            <Button  onClick={() => handleToSave(values, selectedAmenities)} color="primary">
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
