
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

const BusinessDetailForm = () => {

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
                        alert(JSON.stringify(values, null, 2))
                        setSubmitting(false)
                        resetForm()
                    }, 400)
                }}
            >
                {({ touched, errors, resetForm }) => (
                    <Form>
                        <FormContainer>

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

                            
                            {/* <FormItem> */}
                                {/* <Button
                                    type="reset"
                                    className="ltr:mr-2 rtl:ml-2"
                                    onClick={() => resetForm()}
                                >
                                    Reset
                                </Button> */}
                                {/* <Button variant="solid" type="submit">
                                    Submit
                                </Button> */}
                            {/* </FormItem> */}
                        </FormContainer>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default BusinessDetailForm

