import React, { useRef } from 'react'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import Button from '@mui/material/Button'

import { FormItem, FormContainer } from 'components/ui'
import Input from 'components/ui/Input'
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'

const validationSchema = Yup.object().shape({
    name: Yup.string()
        .min(3, 'Too Short!')
        .max(20, 'Too Long!')
        .required('Please input user name 3 to 20 charachters.'),
    description: Yup.string().max(255, 'Too Long!'),
    price: Yup.number()
        .required('Price is required')
        .positive('Price should be greater than 0')
        .integer('Price should be an integer'),
    averageTimeInMinutes: Yup.number()
        .required('Duration is required')
        .positive('Duration should be a greater than 0')
        .integer('Duration should be an integer'),
})

export default function UpdateServiceModal({
    selectedService,
    open,
    handleToClose,
    handleServiceUpdate,
    isSubmitting,
}) {
    const formIkRef = useRef()

    return (
        <div stlye={{}}>
            <Dialog
                open={open}
                onClose={handleToClose}
                fullWidth={true}
                PaperProps={{
                    style: {
                        minWidth: '400px', // Your desired minimum width
                        maxWidth: '600px', // Your desired maximum width
                    },
                }}
            >
                <DialogTitle>{'Update Service'}</DialogTitle>
                <DialogContent>
                    <Formik
                        enableReinitialize
                        initialValues={{
                            id:
                                selectedService == null
                                    ? ''
                                    : selectedService.id,
                            name:
                                selectedService == null
                                    ? ''
                                    : selectedService.name,
                            description:
                                selectedService == null
                                    ? ''
                                    : selectedService.description,
                            price:
                                selectedService == null
                                    ? ''
                                    : selectedService.price,
                            averageTimeInMinutes:
                                selectedService == null
                                    ? ''
                                    : selectedService.averageTimeInMinutes,
                            properties:
                                selectedService == null
                                    ? ''
                                    : selectedService.properties,
                        }}
                        validationSchema={validationSchema}
                        onSubmit={async (
                            values,
                            { setSubmitting, setErrors }
                        ) => {
                            try {
                                const saveResult = await handleServiceUpdate(
                                    values
                                ) // Call handleServiceSave with form values

                                if (saveResult.status === -1) {
                                    setErrors({ name: saveResult.message })
                                }
                            } catch (error) {
                                console.error(
                                    'Error while saving sevice:',
                                    error
                                )
                            } finally {
                                setSubmitting(false)
                            }
                        }}
                        innerRef={formIkRef}
                    >
                        {({
                            values,
                            touched,
                            errors,
                            resetForm,
                            submitForm,
                            isSubmitting,
                        }) => (
                            <div>
                                <Form>
                                    <FormContainer>
                                        <FormItem
                                            asterisk
                                            label="Service Name"
                                            invalid={
                                                errors.name && touched.name
                                            }
                                            errorMessage={errors.name}
                                        >
                                            <Field
                                                type="text"
                                                name="name"
                                                placeholder="Service Name"
                                                component={Input}
                                            />
                                        </FormItem>
                                        <FormItem
                                            label="Description"
                                            invalid={
                                                errors.description &&
                                                touched.description
                                            }
                                            errorMessage={errors.description}
                                        >
                                            <Field
                                                type="text"
                                                name="description"
                                                placeholder="Description"
                                                component={Input}
                                            />
                                        </FormItem>

                                        <div
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                            }}
                                        >
                                            <div
                                                style={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    width: '50%',
                                                    paddingRight: '10px',
                                                }}
                                            >
                                                <FormItem
                                                    asterisk
                                                    label="Price"
                                                    invalid={
                                                        errors.price &&
                                                        touched.price
                                                    }
                                                    errorMessage={errors.price}
                                                >
                                                    <div
                                                        style={{
                                                            display: 'flex',
                                                            justifyContent:
                                                                'space-between',
                                                            alignItems:
                                                                'center',
                                                        }}
                                                    >
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
                                            <div
                                                style={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    width: '50%',
                                                    paddingLeft: '10px',
                                                }}
                                            >
                                                <FormItem
                                                    asterisk
                                                    label="Duration (Increment of 5)"
                                                    invalid={
                                                        errors.averageTimeInMinutes &&
                                                        touched.averageTimeInMinutes
                                                    }
                                                    errorMessage={
                                                        errors.averageTimeInMinutes
                                                    }
                                                >
                                                    <div
                                                        style={{
                                                            display: 'flex',
                                                            justifyContent:
                                                                'space-between',
                                                            alignItems:
                                                                'center',
                                                        }}
                                                    >
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

                                    <DialogActions>
                                        <Button
                                            onClick={handleToClose}
                                            color="primary"
                                        >
                                            Cancel
                                        </Button>
                                        <Button
                                            /* onClick={() =>
                                            handleServiceUpdate(values)
                                        } */
                                            type="submit"
                                            color="primary"
                                            disabled={
                                                isSubmitting ||
                                                Object.keys(errors).length !==
                                                    0 ||
                                                !Object.keys(touched).length
                                            }
                                        >
                                            Save
                                        </Button>
                                    </DialogActions>
                                </Form>
                            </div>
                        )}
                    </Formik>
                </DialogContent>
            </Dialog>
        </div>
    )
}
