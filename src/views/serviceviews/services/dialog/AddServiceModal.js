import React from "react";
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

 
export default function AddServiceModal({open, handleToClose}) {
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
                    input: '',
                    select: '',
                    multipleSelect: [],
                    date: null,
                    time: null,
                    singleCheckbox: false,
                    multipleCheckbox: [],
                    radio: '',
                    switcher: false,
                    segment: [],
                    upload: [],
                }}
                validationSchema={validationSchema}
                onSubmit={(values, { setSubmitting }) => {
                    console.log('values', values)
                    setTimeout(() => {
                        alert(JSON.stringify(values, null, 2))
                        setSubmitting(false)
                    }, 400)
                }}
            >
                {({ values, touched, errors, resetForm }) => (
                      <Form>
                      <FormContainer>
                          <FormItem
                              asterisk
                              label="Service Name"
                              invalid={errors.input && touched.input}
                              errorMessage={errors.input}
                          >
                              <Field
                                  type="text"
                                  name="serviceName"
                                  placeholder="Service Name"
                                  component={Input}
                              />
                          </FormItem>

                          <FormItem
                              label="Description"
                              invalid={errors.input && touched.input}
                              errorMessage={errors.input}
                          >
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
            label="Cost"
            invalid={errors.input && touched.input}
            errorMessage={errors.input}
        >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Field
                    type="number"
                    name="cost"
                    placeholder="Cost"
                    component={Input}
                    inputMode="numeric"
                    min="0" // If you don't want negative values
                    step="0.01" // If you want to allow cents
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
            invalid={errors.duration && touched.duration}
            errorMessage={errors.duration}
        >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Field
                    type="number"
                    name="duration"
                    placeholder="Duration in minutes"
                    component={Input}
                    min="1" // Assuming the minimum duration is 1 minute
                    style={{ flex: 1 }} // Make the input take as much space as possible
                />
                <span>Min</span>
            </div>
        </FormItem>
    </div>
</div>

                          </FormContainer>
                    </Form>
                )}
            </Formik>
                </DialogContent>
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
            </Dialog>
        </div>
    );
}
