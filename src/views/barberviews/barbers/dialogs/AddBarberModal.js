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
import Select from 'components/ui/Select'



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


const servicesOptions = [
    { value: 'HairCut', label: 'HairCut', color: '#00B8D9' },
    { value: 'Beard', label: 'Beard', color: '#0052CC' },
    { value: 'Straight razor shave', label: 'SRS', color: '#5243AA' },
    { value: 'Waxing', label: 'Waxing', color: '#FF5630' },
]

 
export default function AddBarberModal({open, handleToClose}) {
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
                              label="Name"
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
                              label="About"
                              invalid={errors.about && touched.about}
                              errorMessage={errors.about}
                          >
                              <Field
                                  type="text"
                                  name="about"
                                  placeholder="About Barber"
                                  component={Input}
                              />
                          </FormItem>

                          <FormItem
                              label="Services"
                              invalid={errors.about && touched.about}
                              errorMessage={errors.about}
                          >
                          <Select
                            isMulti
                            placeholder="Please Select Services"
                            defaultValue={[]}
                            options={servicesOptions}
                        />
                        </FormItem>

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
