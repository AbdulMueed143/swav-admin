
import { useState } from 'react'
import  FormItem from 'components/ui/Form/FormItem'
import FormContainer from 'components/ui/Form/FormContainer'

import Input from 'components/ui/Input';
import Button  from 'components/ui/Buttons/Button';
import Checkbox from 'components/ui/Checkbox/Checkbox'
import { Field, Form, Formik } from 'formik'
import { HiOutlineEyeOff, HiOutlineEye } from 'react-icons/hi'
import * as Yup from 'yup'
import { useSelector } from 'react-redux'



const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email Required'),
    userName: Yup.string()
        .min(3, 'Too Short!')
        .max(12, 'Too Long!')
        .required('User Name Required'),
    password: Yup.string()
        .required('Password Required')
        .min(8, 'Too Short!')
        .matches(/^[A-Za-z0-9_-]*$/, 'Only Letters & Numbers Allowed'),
    rememberMe: Yup.bool(),
})

const ProfileForm = () => {

    

    const userInfo = useSelector((state) => state.auth.user);

    console.log(userInfo);

    return (
        <div>
            <Formik
                 initialValues={{
                    businessName: '',
                    shopName: '',
                    ownerFirstName: userInfo.firstName ,
                    ownerLastName: userInfo.lastName,
                    ownerEmail: userInfo.email,
                    ownerPhoneNumber: userInfo.phoneNumber,
                    ownerPassword: '',
                    address: '',
                    properties: {},
                    ownerConfirmPassword: '',
                    googleAddress: '',
                    placeId: ''
                }}
                validationSchema={validationSchema}
                onSubmit={(values, { resetForm, setSubmitting }) => {
                    setTimeout(() => {
                        // alert(JSON.stringify(values, null, 2))
                        setSubmitting(false)
                        resetForm()
                    }, 400)
                }}
            >
                {({ touched, errors }) => (
                    <Form>
                        <FormContainer>
                        <div style={{ display: 'flex'}}>
                            <FormItem
                                    
                                    label="First Name"
                                    invalid={errors.ownerFirstName && touched.ownerFirstName}
                                    errorMessage={errors.ownerFirstName}
                                >
                                <Field
                                readOnly
                                asterick
                                    type="text"
                                    autoComplete="off"
                                    name="ownerFirstName"
                                    placeholder="First Name"
                                    component={Input}

                                />
                            </FormItem>
                            <div style={{width:"10px"}}> </div>
                                <FormItem
                                        required
                                        label="Last Name"
                                        invalid={errors.ownerLastName && touched.ownerLastName}
                                        errorMessage={errors.ownerLastName}>
                                        <Field
                                            readOnly
                                            type="text"
                                            autoComplete="off"
                                            name="ownerLastName"
                                            placeholder="Last Name"
                                            component={Input}
                                        />
                                </FormItem>
                        </div>

                            <FormItem
                                label="Email"
                                invalid={errors.ownerEmail && touched.ownerEmail}
                                errorMessage={errors.ownerEmail}
                            >
                                <Field
                                    readOnly
                                    type="email"
                                    autoComplete="off"
                                    name="ownerEmail"
                                    placeholder="Email"
                                    component={Input}
                                />
                            </FormItem>

                            <FormItem
                                    label="Phone Number"
                                    invalid={errors.ownerPhoneNumber && touched.ownerPhoneNumber}
                                    errorMessage={errors.ownerPhoneNumber}>
                                    <Field
                                        readOnly
                                        type="text"
                                        autoComplete="off"
                                        name="ownerPhoneNumber"
                                        placeholder="Phone Number"
                                        component={Input}
                                    />
                            </FormItem>
                            
                        </FormContainer>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default ProfileForm

