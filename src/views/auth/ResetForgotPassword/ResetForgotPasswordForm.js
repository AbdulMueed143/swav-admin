import React, { useState, useEffect } from 'react'
import { PasswordInput, ActionLink } from 'components/shared'
import {
    Input,
    Button,
    Checkbox,
    FormItem,
    FormContainer,
    Alert,
} from 'components/ui'
import { apiResetTempPassword } from 'services/AuthService'
import useTimeOutMessage from 'utils/hooks/useTimeOutMessage'
import { useNavigate } from 'react-router-dom'
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import { useLocation } from 'react-router-dom';
import useAuth from 'utils/hooks/useAuth'


const validationSchema = Yup.object().shape({
    password: Yup.string().required('Please enter your password'),
    confirmPassword: Yup.string().oneOf(
        [Yup.ref('password'), null],
        'Your passwords do not match'
    ),
})

const ResetForgotPasswordForm = (props) => {
    const { disableSubmit = false, className, signInUrl = '/sign-in' } = props

    const { resetForgotPassword } = useAuth()


    const location = useLocation();
    const [email, setEmail] = useState('');
    const [sessionId, setSessionId] = useState('');
    
    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const emailParam = queryParams.get('email');
        const sessionIdParam = queryParams.get('sessionId');

        if (emailParam) setEmail(emailParam);
        if (sessionIdParam) setSessionId(sessionIdParam);

        console.log("USer set email ", email, emailParam);
        console.log("USer set sessionId ", sessionId, sessionIdParam);
    }, []);

    const [resetComplete, setResetComplete] = useState(false)

    const [message, setMessage] = useTimeOutMessage()

    const navigate = useNavigate()

    const onSubmit = async (values, setSubmitting) => {
        // const { password } = values

        console.log("USer set email ", values.email);

        setSubmitting(true)
        try {
            const result = await resetForgotPassword(values.email, values.password, values.passCode)
           
            if (result.status === 'failed') {
                setMessage(result.message)
            }
    
            setSubmitting(false)

        } catch (errors) {
            setMessage(errors?.response?.data?.message || errors.toString())
            setSubmitting(false)
        }
    }

  
    const onContinue = () => {
        navigate('/sign-in')
    }

    return (
        <div className={className}>
            <div className="mb-6">
                {resetComplete ? (
                    <>
                        <h3 className="mb-1">Reset done</h3>
                        <p>Your password has been successfully reset</p>
                    </>
                ) : (
                    <>
                        <h3 className="mb-1">Set new password</h3>
                        <p>
                            Your new password must different to previos password
                        </p>
                    </>
                )}
            </div>
            {message && (
                <Alert className="mb-4" type="danger" showIcon>
                    {message}
                </Alert>
            )}
            <Formik
                // Remove this initial value
                initialValues={{
                    email: '',
                    passCode: '',
                    password: '',
                    confirmPassword: '',
                    rememberMe: true,
                }}
                validationSchema={validationSchema}
                onSubmit={(values, { setSubmitting }) => {
                    if (!disableSubmit) {
                        onSubmit(values, setSubmitting)
                    } else {
                        setSubmitting(false)
                    }
                }}
            >
                {({ touched, errors, isSubmitting }) => (
                    <Form>
                        <FormContainer>

                            <FormItem
                                        label="Email"
                                        invalid={
                                            errors.email && touched.email
                                        }
                                        errorMessage={errors.email}
                                    >
                                        <Field
                                            autoComplete="off"
                                            name="email"
                                            placeholder="Email"
                                            component={Input}
                                        />
                                    </FormItem>

                                <FormItem
                                        label="One Time Passcode"
                                        invalid={
                                            errors.passCode && touched.passCode
                                        }
                                        errorMessage={errors.passCode}
                                    >
                                        <Field
                                            autoComplete="off"
                                            name="passCode"
                                            placeholder="One Time Passcode"
                                            component={PasswordInput}
                                        />
                                    </FormItem>

                                    <FormItem
                                        label="Password"
                                        invalid={
                                            errors.password && touched.password
                                        }
                                        errorMessage={errors.password}
                                    >
                                        <Field
                                            autoComplete="off"
                                            name="password"
                                            placeholder="Password"
                                            component={PasswordInput}
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
                                        />
                                    </FormItem>
                                    <Button
                                        block
                                        loading={isSubmitting}
                                        variant="solid"
                                        type="submit"
                                    >
                                        {isSubmitting
                                            ? 'Submiting...'
                                            : 'Submit'}
                                    </Button>

                            <div className="mt-4 text-center">
                                <span>Back to </span>
                                <ActionLink to={signInUrl}>Sign in</ActionLink>
                            </div>
                        </FormContainer>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default ResetForgotPasswordForm
