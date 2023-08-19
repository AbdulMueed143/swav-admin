import React, {useEffect, useState} from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";

import { FormItem, FormContainer } from 'components/ui'
import Input from 'components/ui/Input'
import { Field, Form, Formik, FieldArray } from 'formik'
import { useFormikContext } from 'formik';
import * as Yup from 'yup'
import Select from 'components/ui/Select'

import useBookingServices from 'utils/hooks/useBookingService'

const validationSchema = Yup.object().shape({

})

 
export default function AddBarberAvailabilityModal({open, handleToSave, handleToClose}) {

    const { getServices } = useBookingServices();
    const [services, setServices] = useState([]); // Initial state as an empty array
    const [selectedAmenities, setSelectedAmenities] = React.useState([]);

    
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
                <DialogTitle>{"Add Barber Availability"}</DialogTitle>
                <DialogContent>

                <Formik
                    enableReinitialize
                    initialValues={{
                    days:  { 
                        monday: [],
                        teusday: [],
                        wednesday: [],
                        thursday: [],
                        friday: [],
                        saturday: [],
                        sunday: [],
                    },
                    holidays: [],
                    overrideShifts: [],
                    }}
                    validationSchema={validationSchema}
                    onSubmit={(values, { setSubmitting }) => {
                    
                        setSubmitting(false);

                    }}>

                        {({ values, touched, errors, resetForm}) => (

                            <div>
                                <Form>

                                {Object.keys(values.days).map((day) => (
                                    <div key={day}>
                                    <h4>{day.charAt(0).toUpperCase() + day.slice(1)}</h4>
                                    <FieldArray
                                        name={`days.${day}`}
                                        render={(arrayHelpers) => (
                                        <div>
                                            {values.days[day].map((shift, index) => (
                                            <div key={index}>
                                                <Field name={`days.${day}.${index}.start`} placeholder="Start Time" />
                                                <Field name={`days.${day}.${index}.end`} placeholder="End Time" />
                                                <button type="button" onClick={() => arrayHelpers.remove(index)}>Remove Shift</button>
                                            </div>
                                            ))}
                                            <button type="button" onClick={() => arrayHelpers.push({ start: '', end: '' })}>Add Shift</button>
                                        </div>
                                        )}
                                    />
                                    </div>
                                ))}

                                    
                                <div>
                                    <h4>Holidays</h4>
                                    <FieldArray
                                    name="holidays"
                                    render={(arrayHelpers) => (
                                        <div>
                                        {values.holidays.map((date, index) => (
                                            <div key={index}>
                                            <Field type="date" name={`holidays.${index}`} />
                                            <button type="button" onClick={() => arrayHelpers.remove(index)}>Remove Date</button>
                                            </div>
                                        ))}
                                        <button type="button" onClick={() => arrayHelpers.push('')}>Add Date</button>
                                        </div>
                                    )}
                                    />
                                </div>
                                
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
