import React, { useEffect, useState, useRef } from 'react'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import Button from '@mui/material/Button'
import { FormItem, FormContainer } from 'components/ui'
import Input from 'components/ui/Input'
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import Select from 'components/ui/Select'
import useBookingServices from 'utils/hooks/useBookingService'

export default function AddBarberModal({
    open,
    handleToSave,
    handleToClose,
    barbers,
}) {
    const { getServices } = useBookingServices()
    const [services, setServices] = useState([]) // Initial state as an empty array
    const [selectedAmenities, setSelectedAmenities] = useState([])
    // const { setFieldValue } = useFormikContext();

    // Define a function to fetch and update the services
    const fetchServices = async () => {
        const data = await getServices()
        setServices(data)
        setSelectedAmenities(data)
    }

    useEffect(() => {
        // Call fetchServices on component mount
        fetchServices()
    }, []) // Empty dependency array means the effect will only run once

    // Map your services array to an array of options
    const serviceMap = services.map((service) => ({
        value: service.name,
        label: service.name,
    }))

    const formIkRef = useRef()

    //Validation for inputs
    const validationSchema = Yup.object().shape({
        firstName: Yup.string()
            .required('Required')
            .max(25, 'Too long')
            .test('unique', 'This name already exists', function (value) {
                const existingFNames = barbers.map((item) => item.firstName)
                return !existingFNames.includes(value)
            }),
        lastName: Yup.string()
            .required('Required')
            .max(25, 'Too long')
            .test('unique', 'This name already exists', function (value) {
                const existingFNames = barbers.map((item) => item.lastName)
                return !existingFNames.includes(value)
            }),
        email: Yup.string()
            .email()
            .required('Required')
            .test('unique', 'This email already exists', function (value) {
                const existingFNames = barbers.map((item) => item.email)
                return !existingFNames.includes(value)
            }),
        phoneNumber: Yup.string()
            .max(25)
            .required('Required')
            .test(
                'unique',
                'This phone number already exists',
                function (value) {
                    const existingFNames = barbers.map(
                        (item) => item.phoneNumber
                    )
                    return !existingFNames.includes(value)
                }
            ),
        bookingWindowInWeeks: Yup.string()
            .max(52, "Shoudn't be more than 52")
            .min(1, "Shoudn't be less than 1")
            .required('Required'),
        about: Yup.string().max(
            250,
            'About should be less than 250 charachters'
        ),
        amenities: Yup.array()
            .min(1, 'Atleast one service must be chosen')
            .required('Required'),
    })

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
                <DialogTitle>{'Add Barber'}</DialogTitle>
                <DialogContent>
                    <Formik
                        enableReinitialize
                        initialValues={{
                            firstName: '',
                            lastName: '',
                            phoneNumber: '',
                            email: '',
                            bookingWindowInWeeks: '2',
                            amenities: [],
                            about: '',
                        }}
                        validationSchema={validationSchema}
                        onSubmit={async (values, { setSubmitting }) => {
                            // Simulate a submission
                            setSubmitting(true) // Ensure isSubmitting is set to true
                            try {
                                // Your submission logic here
                                await handleToSave(values, selectedAmenities)
                            } finally {
                                setSubmitting(false) // Reset isSubmitting to false
                                handleToClose() // Close the dialog
                            }
                        }}
                        innerRef={formIkRef}
                    >
                        {({
                            values,
                            touched,
                            errors,
                            resetForm,
                            isSubmitting,
                            setFieldTouched,
                            setFieldValue,
                        }) => (
                            <div>
                                <Form>
                                    <FormContainer>
                                        <div
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                            }}
                                        >
                                            <FormItem
                                                asterisk
                                                required
                                                label="First Name"
                                                invalid={
                                                    errors.firstName &&
                                                    touched.firstName
                                                }
                                                errorMessage={errors.firstName}
                                            >
                                                <Field
                                                    type="text"
                                                    autoComplete="off"
                                                    name="firstName"
                                                    placeholder="First Name"
                                                    component={Input}
                                                />
                                            </FormItem>
                                            <div style={{ width: '10px' }}>
                                                {' '}
                                            </div>
                                            <FormItem
                                                asterisk
                                                required
                                                label="Last Name"
                                                invalid={
                                                    errors.lastName &&
                                                    touched.lastName
                                                }
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
                                            required
                                            label="Email"
                                            invalid={
                                                errors.email && touched.email
                                            }
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
                                            required
                                            label="Phone Number"
                                            invalid={
                                                errors.phoneNumber &&
                                                touched.phoneNumber
                                            }
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
                                            name="amenities"
                                            invalid={
                                                errors.amenities &&
                                                touched.amenities
                                            }
                                            errorMessage={errors.amenities}
                                        >
                                            <Select
                                                isMulti
                                                name="amenities"
                                                placeholder="Please Select"
                                                options={serviceMap}
                                                onChange={(selectedOptions) => {
                                                    // Get selected amenities from services list using the selected names
                                                    const selectedAmenities =
                                                        selectedOptions
                                                            ? selectedOptions.map(
                                                                  (option) => {
                                                                      return services.find(
                                                                          (
                                                                              service
                                                                          ) =>
                                                                              service.name ===
                                                                              option.value
                                                                      )
                                                                  }
                                                              )
                                                            : []

                                                    setSelectedAmenities(
                                                        selectedAmenities
                                                    )

                                                    setFieldValue(
                                                        'amenities',
                                                        selectedOptions
                                                            ? selectedOptions.map(
                                                                  (option) =>
                                                                      option.value
                                                              )
                                                            : []
                                                    )
                                                }}
                                                onBlur={() => {
                                                    setFieldTouched(
                                                        'amenities',
                                                        true
                                                    )
                                                }}
                                            />
                                        </FormItem>

                                        <FormItem
                                            label="Advance Booking Window in Weeks (1-52)"
                                            invalid={
                                                errors.bookingWindowInWeeks &&
                                                touched.bookingWindowInWeeks
                                            }
                                            errorMessage={
                                                errors.bookingWindowInWeeks
                                            }
                                        >
                                            <Field
                                                type="number" // Change the type to 'number' to allow only numeric inputs
                                                name="bookingWindowInWeeks" // Make sure the 'name' attribute corresponds to your data model
                                                placeholder="Enter weeks (1-52)"
                                                component={Input}
                                                min="1" // Set the minimum value to 1
                                                max="52" // Set the maximum value to 52
                                            />
                                        </FormItem>

                                        <FormItem
                                            label="About"
                                            invalid={
                                                errors.about && touched.about
                                            }
                                            errorMessage={errors.about}
                                        >
                                            <Field
                                                type="text"
                                                name="about"
                                                placeholder="About Barber (Max 250 Charachters)"
                                                component={Input}
                                            />
                                        </FormItem>

                                        <DialogActions>
                                            <Button
                                                onClick={handleToClose}
                                                color="primary"
                                            >
                                                Cancel
                                            </Button>
                                            <Button
                                                /* onClick={() =>
                                                    handleToSave(
                                                        values,
                                                        selectedAmenities
                                                    )
                                                } */
                                                type="submit"
                                                color="primary"
                                                disabled={
                                                    isSubmitting ||
                                                    Object.keys(errors)
                                                        .length !== 0 ||
                                                    !Object.keys(touched).length
                                                }
                                            >
                                                {isSubmitting
                                                    ? 'Saving...'
                                                    : 'Save'}
                                            </Button>
                                        </DialogActions>
                                    </FormContainer>
                                </Form>
                            </div>
                        )}
                    </Formik>
                </DialogContent>
            </Dialog>
        </div>
    )
}
