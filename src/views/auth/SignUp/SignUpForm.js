import React, { useState, useRef, useEffect } from 'react'
import { Input, Button, FormItem, FormContainer, Alert } from 'components/ui'
import { PasswordInput, ActionLink } from 'components/shared'
import useTimeOutMessage from 'utils/hooks/useTimeOutMessage'
import { Field, Form, Formik, useFormikContext, FormikStep } from 'formik'
import * as Yup from 'yup'
import useAuth from 'utils/hooks/useAuth'
import AddressAutocomplete from 'components/ui/custom/barbers/AddressAutocomplete'
import { current } from '@reduxjs/toolkit'

{
    /* <script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=AIzaSyB01eSc8cHSkUO3H1HXBiaeGWE8qBJcjoI&libraries=places"></script> */
}

// We are using following for the auto complete of places api
// https://www.npmjs.com/package/react-google-autocomplete

const signupFormValidationSchema = Yup.object().shape({
    ownerFirstName: Yup.string().required('Firstname Required'),
    ownerLastName: Yup.string().required('Lastname Required'),
    ownerEmail: Yup.string().email().required('Please enter your email'),
    ownerPhoneNumber: Yup.string()
        .required('Phone number is required')
        .matches(/^[0-9]{9,}$/, 'Phone number must be at least 9 digits'),
    ownerPassword: Yup.string()
        .required('Please enter your password')
        .matches(
            /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{6,}$/,
            'Min 1 uppercase, 1 Number and 6 charachters'
        ),
    confirmPassword: Yup.string().oneOf(
        [Yup.ref('password'), null],
        'Your passwords do not match'
    ),
    address: Yup.string().required('Please enter your address'),
})

const SignUpForm = (props) => {
    //References
    const formIkRef = useRef()
    const alertRef = useRef()

    //Declaration of variables
    const { disableSubmit = false, className, signInUrl = '/sign-in' } = props
    const { signUp, createAccount } = useAuth()
    const [message, setMessage] = useTimeOutMessage()

    // Use useEffect to scroll to the alert when the message changes
    useEffect(() => {
        if (message && alertRef.current) {
            alertRef.current.scrollIntoView({ behavior: 'smooth' })
        }
    }, [message])

    const [businessName, setBusinessName] = useState('')
    const [website, setWebsite] = useState('')
    const [placeId, setPlaceId] = useState('')
    const [googleAddress, setGoogleAddress] = useState('')
    const [googlePhoneNumber, setGooglePhoneNumber] = useState('')
    const [openingHours, setOpeningHours] = useState('')

    //Address type change
    const [manualEntry, setManualEntry] = useState(false)
    const toggleManualEntry = () => setManualEntry(!manualEntry)

    //Breaking the signup processs, use following methods
    const onRegisterAccount = async (values, setSubmitting) => {
        formIkRef.current.setSubmitting(true)

        const {
            ownerFirstName,
            ownerLastName,
            shopName,
            ownerPhoneNumber,
            ownerPassword,
            ownerEmail,
        } = values

        var currentAddress = ''
        var extraProperties = {}

        // Map values to API expected variables
        const apiValues = {
            businessName: shopName,
            shopName: shopName,
            ownerFirstName: ownerFirstName,
            ownerLastName: ownerLastName,
            ownerEmail: ownerEmail,
            ownerPhoneNumber: ownerPhoneNumber,
            ownerPassword: ownerPassword,
        }

        // Expected payload
        // {
        //     "businessName": "Some business name",
        //     "shopName": "Some shop name",
        //     "ownerFirstName": "Avenash",
        //     "ownerLastName": "Kumar",
        //     "ownerEmail": "someemail1@swav.app",
        //     "ownerPhoneNumber": "3473246772",
        //     "ownerPassword": "hello",
        //     "address": {
        //         "line1": "82B Anderson Hill rd",
        //         "line2": "APT 21",
        //         "city": "Bernardsville",
        //         "state": "NJ",
        //         "postalCode": "07075",
        //         "country": "USA"
        //     },
        //     "properties": {
        //         "shopLogoImage": "https://d2zdpiztbgorvt.cloudfront.net/region1/us/198641/biz_photo/861cf7a9a93f45d2acb78a29bc4f52-sam-s-barber-shop-llc-biz-photo-ee1a382b979040898be85eb00d26a6-booksy.jpeg"
        //     }
        // }

        const result = await createAccount(apiValues)
        //depending on the result we will either show error or next step ...
        if (result.status === 'success') {
            console.log("Success")
        }
        else {
            setMessage(result.message)
            formIkRef.current.setSubmitting(false)
        }
    }

    return (
        <div
            className={className}
            style={{
                padding: '10px',
                display: 'flex',
                flexDirection: 'column',
                height: '100vh',
            }}
        >
            <div style={{ flex: 6, overflowY: 'auto', padding: '2px' }}>
                <Formik
                    initialValues={{
                        businessName: '',
                        shopName: '',
                        ownerFirstName: '',
                        ownerLastName: '',
                        ownerEmail: '',
                        ownerPhoneNumber: '',
                        ownerPassword: '',
                        properties: {},
                        ownerConfirmPassword: '',
                    }}
                    onSubmit={(values) => {
                        // onRegisterAccount(values); // Call onRegisterAccount when form is submitted and valid
                    }}
                    validationSchema={signupFormValidationSchema}
                    innerRef={formIkRef}
                >
                    {({ touched, errors, isSubmitting, values }) => (
                        <Form>
                            <FormContainer>
                                {message && (
                                    <div ref={alertRef}>
                                        <Alert
                                            closable="true"
                                            showIcon
                                            className="mb-4"
                                            type="danger"
                                        >
                                            {message}
                                        </Alert>
                                    </div>
                                )}

                                <div
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                    }}
                                >
                                    <FormItem
                                        label="First Name"
                                        invalid={
                                            errors.ownerFirstName &&
                                            touched.ownerFirstName
                                        }
                                        errorMessage={errors.ownerFirstName}
                                    >
                                        <Field
                                            asterick
                                            type="text"
                                            autoComplete="off"
                                            name="ownerFirstName"
                                            placeholder="First Name"
                                            component={Input}
                                        />
                                    </FormItem>
                                    <div style={{ width: '10px' }}> </div>
                                    <FormItem
                                        required
                                        label="Last Name"
                                        invalid={
                                            errors.ownerLastName &&
                                            touched.ownerLastName
                                        }
                                        errorMessage={errors.ownerLastName}
                                    >
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name="ownerLastName"
                                            placeholder="Last Name"
                                            component={Input}
                                        />
                                    </FormItem>
                                </div>

                                <FormItem
                                    label="Shop Name"
                                    invalid={
                                        errors.shopName && touched.shopName
                                    }
                                    errorMessage={errors.shopName}
                                >
                                    <Field
                                        type="email"
                                        autoComplete="off"
                                        name="shopName"
                                        placeholder="Shop Name"
                                        component={Input}
                                    />
                                </FormItem>

                                <FormItem
                                    label="Email"
                                    invalid={
                                        errors.ownerEmail && touched.ownerEmail
                                    }
                                    errorMessage={errors.ownerEmail}
                                >
                                    <Field
                                        type="email"
                                        autoComplete="off"
                                        name="ownerEmail"
                                        placeholder="Email"
                                        component={Input}
                                    />
                                </FormItem>

                                {/* <div>

                                    {!manualEntry && (
                                        <FormItem
                                        label="Find Your Address"
                                        invalid={errors.googleAddress && touched.googleAddress}
                                        errorMessage={errors.googleAddress}
                                        >
                                        <AddressAutocomplete 
                                            setBusinessName={setBusinessName}
                                            setGoogleAddress={setGoogleAddress}
                                            setWebsite={setWebsite}
                                            setPlaceId={setPlaceId}
                                            setOpeningHours={setOpeningHours}
                                        />
                                        </FormItem>
                                    )}

                                    {manualEntry && (
                                            <>

                                            <FormItem
                                                label="Business Name"
                                                invalid={errors.customBusinessName && touched.customBusinessName}
                                                errorMessage={errors.customBusinessName}>

                                                <Field
                                                    type="text"
                                                    autoComplete="off"
                                                    name="customBusinessName"
                                                    placeholder="Business Name"
                                                    component={Input}
                                            />
                                            </FormItem>

                                        <FormItem
                                                label="Address"
                                                invalid={errors.address && touched.address}
                                                errorMessage={errors.address}>

                                                <Field
                                                    type="text"
                                                    autoComplete="off"
                                                    name="address"
                                                    placeholder="Address"
                                                    component={Input}
                                            />
                                            </FormItem>

                                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>

                                                <FormItem
                                                    label="State"
                                                    invalid={errors.state && touched.state}
                                                    errorMessage={errors.state}
                                                >
                                                    <Field
                                                        type="text"
                                                        autoComplete="off"
                                                        name="state"
                                                        placeholder="State"
                                                        component={Input} />
                                                </FormItem>

                                                <FormItem
                                                    label="Postcode"
                                                    invalid={errors.postcode && touched.postcode}
                                                    errorMessage={errors.postcode}
                                                >
                                                    <Field
                                                        type="text"
                                                        autoComplete="off"
                                                        name="postcode"
                                                        placeholder="Postcode"
                                                        component={Input} />
                                                </FormItem>

                                            </div>

                                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>

                                                <FormItem
                                                    label="City"
                                                    invalid={errors.city && touched.city}
                                                    errorMessage={errors.city}
                                                >
                                                                <Field
                                                                    type="text"
                                                                    autoComplete="off"
                                                                    name="city"
                                                                    placeholder="City"
                                                                    component={Input} />
                                                </FormItem>

                                                <FormItem
                                                    label="Country"
                                                    invalid={errors.country && touched.country}
                                                    errorMessage={errors.country}
                                                >
                                                                <Field
                                                                    type="text"
                                                                    autoComplete="off"
                                                                    name="country"
                                                                    placeholder="Country"
                                                                    component={Input} />
                                                </FormItem>

                                            </div>

                                            </>
                                    )}


                                    </div> */}

                                {/* <FormItem>                    
                                            <button 
                                                style={{ 
                                                    float: 'right', 
                                                    backgroundColor: 'blue', // replace 'blue' with your desired color
                                                    color: 'white', 
                                                    border: 'none',
                                                    padding: '5px 10px',
                                                    borderRadius: '5px',
                                                    cursor: 'pointer'
                                                }}
                                                variant="solid"
                                                type="submit"
                                                onClick={(event) => { 
                                                    event.preventDefault(); 
                                                    toggleManualEntry();
                                                }}>
                                                {manualEntry ? 'Find Address Using Google' : 'Add Address Manually'}
                                            </button>
                                </FormItem>    */}

                                <FormItem
                                    label="Phone Number"
                                    invalid={
                                        errors.ownerPhoneNumber &&
                                        touched.ownerPhoneNumber
                                    }
                                    errorMessage={errors.ownerPhoneNumber}
                                >
                                    <Field
                                        type="text"
                                        autoComplete="off"
                                        name="ownerPhoneNumber"
                                        placeholder="Phone Number"
                                        component={Input}
                                    />
                                </FormItem>

                                <FormItem
                                    label="Password"
                                    invalid={
                                        errors.ownerPassword &&
                                        touched.ownerPassword
                                    }
                                    errorMessage={errors.ownerPassword}
                                >
                                    <Field
                                        autoComplete="off"
                                        name="ownerPassword"
                                        placeholder="Password"
                                        component={PasswordInput}
                                    />
                                </FormItem>
                                <FormItem
                                    label="Confirm Password"
                                    invalid={
                                        errors.ownerConfirmPassword &&
                                        touched.ownerConfirmPassword
                                    }
                                    errorMessage={errors.ownerConfirmPassword}
                                >
                                    <Field
                                        autoComplete="off"
                                        name="ownerConfirmPassword"
                                        placeholder="Confirm Password"
                                        component={PasswordInput}
                                    />
                                </FormItem>

                                <FormItem
                                    label="Upload Logo"
                                    invalid={errors.logo && touched.logo}
                                    errorMessage={errors.logo}
                                >
                                    <Field
                                        type="file"
                                        autoComplete="off"
                                        name="logo"
                                        component={Input}
                                    />
                                </FormItem>

                                <Button
                                    block
                                    loading={isSubmitting}
                                    variant="solid"
                                    type="submit"
                                    onClick={(event) => {
                                        event.preventDefault()
                                        onRegisterAccount(values)
                                    }}
                                >
                                    {isSubmitting
                                        ? 'Creating Account...'
                                        : 'Create Account'}
                                </Button>

                                <div className="mt-4 text-center">
                                    <span>Already have an account? </span>
                                    <ActionLink to={signInUrl}>
                                        Sign in
                                    </ActionLink>
                                </div>
                            </FormContainer>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    )
}

export default SignUpForm
