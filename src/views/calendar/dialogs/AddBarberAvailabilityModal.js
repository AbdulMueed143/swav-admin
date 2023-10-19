import React, {useEffect, useState} from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";

import { FormItem, FormContainer } from 'components/ui';
import Input from 'components/ui/Input';
import { Field, Form, Formik, FieldArray } from 'formik';
import { useFormikContext } from 'formik';
import * as Yup from 'yup';

import useBookingServices from "utils/hooks/useBookingService";
import { DatePicker, Space } from 'antd';
import { TimePicker } from 'antd';
import ButtonWithIcon from "components/ui/custom/barbers/ButtonWithIcon";
import { Button } from 'antd';

const { RangePicker } = DatePicker;

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
                        MONDAY: [],
                        TUESDAY: [],
                        WEDNESDAY: [],
                        THURSDAY: [],
                        FRIDAY: [],
                        SATURDAY: [],
                        SUNDAY: [],
                    },
                    holidays: [],
                    overrideShifts: {},
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
                                            <div style={{padding: 5 + 'px'}}>
                                            {values.days[day].map((shift, index) => (
                                                <div key={index} style={{padding: 5 + 'px'}}>
                                                    <TimePicker.RangePicker 
                                                    getPopupContainer={trigger => trigger.parentElement} 
                                                    format="HH:mm" 
                                                    onChange={(time, timeString) => {
                                                        const updatedShift = { startTime: timeString[0], endTime: timeString[1] };
                                                        const newDaysArray = [...values.days[day]]; // make a copy of the current array
                                                        newDaysArray[index] = updatedShift; // update the specific time range in the array
                                                        arrayHelpers.replace(index, updatedShift); // replace the current index with the new object
                                                        // OR you can set it directly using Formik's setFieldValue
                                                        // setFieldValue(`days.${day}`, newDaysArray);
                                                      }} 
                                                    />
                          
                                                    <Button type="primary" onClick={() => arrayHelpers.remove(index)} danger>
                                                        Remove Shift
                                                    </Button>

                                                </div>
                                            ))}
                                            
                                            <Button t onClick={() => arrayHelpers.push({ startTime: '', endTime: '' })} >
                                                Add Shift
                                            </Button>

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
                                            <RangePicker 
                                            getPopupContainer={trigger => trigger.parentElement}  
                                            name={`holidays.${index}`} 
                                            onChange={(dates, dateStrings) => {
                                                const updatedDate = { startDate: dateStrings[0], endDate: dateStrings[1] };
                                                arrayHelpers.replace(index, updatedDate);
                                                // Or alternatively,
                                                // setFieldValue(`holidays.${index}`, updatedDate);
                                              }}
                                            />

                                                <Button type="primary" onClick={() => arrayHelpers.remove(index)} danger>
                                                    Remove Date
                                                </Button>
                                            </div>
                                        ))}

                                            <Button  onClick={() => arrayHelpers.push('')}>
                                                Add Date
                                            </Button>

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
