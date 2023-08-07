import React, {useRef} from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";

import { FormItem, FormContainer } from 'components/ui'
import Input from 'components/ui/Input'
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'

const validationSchema = Yup.object().shape({
    input: Yup.string()
        .min(3, 'Too Short!')
        .max(20, 'Too Long!')
        .required('Please input user name!'),
    price: Yup
        .number()
        .required("Price is required")
        .positive("Price should be a positive number")
        .integer("Price should be an integer"),
    averageTimeInMinutes: Yup
        .number()
        .required("Duration is required")
        .positive("Duration should be a positive number")
        .integer("Duration should be an integer"),
})


 
export default function AddServiceModal({open, handleToClose, handleServiceSave}) {

    const formIkRef = useRef();

    return (
        <div stlye={{}}>
            <Dialog open={open} onClose={handleToClose}  fullWidth={true}
                PaperProps={{
                    style: {
                        minWidth: '400px', // Your desired minimum width
                        maxWidth: '600px', // Your desired maximum width
                    },
                }}> 
                <DialogTitle>{"Add Service"}</DialogTitle>
                <DialogContent>

                <Formik
                    enableReinitialize
                    initialValues={{
                        name: '',
                        description: '',
                        price: 0,
                        averageTimeInMinutes: 0,
                        properties : {}
                    }}
                    validationSchema={validationSchema}
                    onSubmit={(values, { setSubmitting }) => {
                        // handleServiceSave(values); // Call handleServiceSave with form values
                        setSubmitting(false);
                        
                    }}
                    innerRef={formIkRef}

                >

                    {({ values, touched, errors, resetForm, submitForm }) => (
                        <div>
                            <Form>
                                <FormContainer>
                                    <FormItem
                                        asterisk
                                        label="Service Name"
                                        invalid={errors.name && touched.name}
                                        errorMessage={errors.name}>
                                    <Field
                                        type="text"
                                        name="name"
                                        placeholder="Service Name"
                                        component={Input}
                                    />
                                </FormItem>
                                <FormItem
                                    label="Description"
                                    invalid={errors.description && touched.description}
                                    errorMessage={errors.description}>
                                    <Field
                                        type="text"
                                        name="description"
                                        placeholder="Description"
                                        component={Input}
                                    />
                                </FormItem>

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
                                <Button onClick={() => handleServiceSave(values)}
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
