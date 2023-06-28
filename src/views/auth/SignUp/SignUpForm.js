import React from 'react'
import { Input, Button, FormItem, FormContainer, Alert } from 'components/ui'
import { PasswordInput, ActionLink } from 'components/shared'
import useTimeOutMessage from 'utils/hooks/useTimeOutMessage'
import { Field, Form, Formik, useFormikContext } from 'formik'
import * as Yup from 'yup'
import useAuth from 'utils/hooks/useAuth'
import Autocomplete from 'react-google-autocomplete';
import BarberShopAutocomplete from 'components/ui/custom/barbers/BarbershopAutocomplete'

{/* <script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=AIzaSyB01eSc8cHSkUO3H1HXBiaeGWE8qBJcjoI&libraries=places"></script> */}


// We are using following for the auto complete of places api 
// https://www.npmjs.com/package/react-google-autocomplete

const validationSchema = Yup.object().shape({
    userName: Yup.string().required('Please enter your user name'),
    email: Yup.string()
        .email('Invalid email')
        .required('Please enter your email'),
    password: Yup.string().required('Please enter your password'),
    confirmPassword: Yup.string().oneOf(
        [Yup.ref('password'), null],
        'Your passwords do not match'
    ),
})

const SignUpForm = (props) => {
    const { disableSubmit = false, className, signInUrl = '/sign-in' } = props

    const { signUp } = useAuth()

    const [message, setMessage] = useTimeOutMessage()

    const onSignUp = async (values, setSubmitting) => {
        const { userName, password, email } = values
        setSubmitting(true)
        const result = await signUp({ userName, password, email })

        if (result.status === 'failed') {
            setMessage(result.message)
        }

        setSubmitting(false)
    }

    const [name, setName] = React.useState("");
    const [address, setAddress] = React.useState("");
    const [phoneNumber, setPhoneNumber] = React.useState("");
    const [website, setWebsite] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [confirmPassword, setConfirmPassword] = React.useState("");



    return (
        <div className={className}>
            {message && (
                <Alert className="mb-4" type="danger" showIcon>
                    {message}
                </Alert>
            )}
            <Formik
            
                initialValues={{
                    name: 'admin1',
                    password: '123Qwe1',
                    confirmPassword: '123Qwe1',
                    address: '',
                    phoneNumber: '',
                    email: 'test@testmail.com',
                }}
                validationSchema={validationSchema}
                onSubmit={(values, { setSubmitting }) => {
                    if (!disableSubmit) {
                        onSignUp(values, setSubmitting)
                    } else {
                        setSubmitting(false)
                    }
                }}
            >
                {({ touched, errors, isSubmitting }) => (
                    <Form>
                        
                        <FormContainer>
                        <FormItem
                                label="Find Your Shop"
                                invalid={errors.shopName && touched.shopName}
                                errorMessage={errors.shopName}
                            >
                            <BarberShopAutocomplete 
                                setName={setName}
                                setAddress={setAddress}
                                setPhoneNumber={setPhoneNumber}
                                setWebsite={setWebsite}
                            />
                        </FormItem>

                            <FormItem
                                label="Shop Name"
                                invalid={errors.shopName && touched.shopName}
                                errorMessage={errors.shopName}
                            >
                                <Field
                                    type="text"
                                    autoComplete="off"
                                    name="shopName"
                                    placeholder="Shop Name"
                                    component={Input}
                                    value={name}
                                    onChange={e => setName(e.target.value)}
                                />
                            </FormItem>
                            <FormItem
                                label="Email"
                                invalid={errors.email && touched.email}
                                errorMessage={errors.email}
                            >
                                <Field
                                    type="email"
                                    autoComplete="off"
                                    name="email"
                                    placeholder="Email"
                                    component={Input}
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                />
                            </FormItem>

                            <FormItem
                                label="Address"
                                invalid={errors.phoneNumber && touched.phoneNumber}
                                errorMessage={errors.phoneNumber}
                            >
                                <Field
                                    type="text"
                                    autoComplete="off"
                                    name="address"
                                    placeholder="Shop Address"
                                    component={Input}
                                    value={address}
                                    onChange={e => setAddress(e.target.value)}
                                />
                            </FormItem>

                            <FormItem
                                label="Phone Number"
                                invalid={errors.phoneNumber && touched.phoneNumber}
                                errorMessage={errors.phoneNumber}
                            >
                                <Field
                                    type="phone"
                                    autoComplete="off"
                                    name="phoneNumber"
                                    placeholder="Phone Number"
                                    component={Input}
                                    value={phoneNumber}
                                    onChange={e => setPhoneNumber(e.target.value)}
                                />
                            </FormItem>

                            <FormItem
                                label="Password"
                                invalid={errors.password && touched.password}
                                errorMessage={errors.password}
                            >
                                <Field
                                    autoComplete="off"
                                    name="password"
                                    placeholder="Password"
                                    component={PasswordInput}
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                />
                            </FormItem>
                            <FormItem
                                label="Confirm Password"
                                invalid={
                                    errors.confirmPassword &&
                                    touched.confirmPassword
                                }
                                errorMessage={errors.confirmPassword}
                            >
                                <Field
                                    autoComplete="off"
                                    name="confirmPassword"
                                    placeholder="Confirm Password"
                                    component={PasswordInput}
                                    value={confirmPassword}
                                    onChange={e => setConfirmPassword(e.target.value)}
                                />
                            </FormItem>
                            <Button
                                block
                                loading={isSubmitting}
                                variant="solid"
                                type="submit"
                            >
                                {isSubmitting
                                    ? 'Creating Account...'
                                    : 'Sign Up'}
                            </Button>
                            <div className="mt-4 text-center">
                                <span>Already have an account? </span>
                                <ActionLink to={signInUrl}>Sign in</ActionLink>
                            </div>
                        </FormContainer>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default SignUpForm
