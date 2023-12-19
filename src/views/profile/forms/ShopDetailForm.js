
import { useEffect, useState } from 'react'
import  FormItem from 'components/ui/Form/FormItem'
import FormContainer from 'components/ui/Form/FormContainer'

import Input from 'components/ui/Input';
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import { useSelector } from 'react-redux'
import { Alert } from 'components/ui'
import useBarberService from 'utils/hooks/CustomServices/useBarberService';
import AddressAutocomplete from 'components/ui/custom/barbers/AddressAutocomplete'

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

const ShopDetailForm = () => {

    const [shopName, setShopName] = useState("");
    const [website, setWebsite] = useState("");
    const [placeId, setPlaceId] = useState("");
    const [googleAddress, setGoogleAddress] = useState("");
    const [googlePhoneNumber, setGooglePhoneNumber] = useState("");
    const [openingHours, setOpeningHours] = useState("");


    const { fetchBarberShopDetail } = useBarberService();


    const userInfo = useSelector((state) => state.auth.user);
    const [loading, setLoading] = useState(false);
    const [barberShopInfo, setBarberShopInfo] = useState(null);

    //Alert
    const [serverError, setServerError] = useState(false);
    const [serverErrorMessage, setServerErrorMessage] = useState(false);

      const handleAlertClose = () => {
        setServerError(false);
        setServerErrorMessage('');
    }

    const showError = (message) => {
        setServerError(true);
        setServerErrorMessage(message);
    }



    //now we will get the shop details
    const fetchShopDetail = async() =>  {
        setLoading(true);

        const response = await fetchBarberShopDetail(userInfo.barberShopId);

        if(response.status == -1) {
            //error
            setServerError(true);
            setServerErrorMessage(response.message);
        }
        else {
            console.log("Setting Result ", response);
            setBarberShopInfo(response);
        }

        //now show error or get the detail
        setLoading(false);
    }

    useEffect(() => {
        fetchShopDetail();
    }, []);


    return (
        <div>

{serverError && (
             <div>
                <Alert showIcon onClose={handleAlertClose} type="danger" title="Error!">
                    {serverErrorMessage}
                </Alert>
            </div>
            )}
            <Formik
                 initialValues={{
                    businessName: '',
                    shopName: barberShopInfo == null ? '' : barberShopInfo?.name ,
                    country: barberShopInfo == null ? '' : barberShopInfo?.address?.country,
                    city: barberShopInfo == null ? '' : barberShopInfo?.address?.city,
                    postcode: barberShopInfo == null ? '' : barberShopInfo?.address?.postalCode,
                    address: '',
                    properties: {},
                    ownerConfirmPassword: '',
                    googleAddress: '',
                    placeId: ''
                }}

                enableReinitialize
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
                                    label="Search Your Barber Shop To Point Via GPS"
                                    invalid={errors.shopName && touched.shopName}
                                    errorMessage={errors.shopName}>

                                <AddressAutocomplete 
                                            setBusinessName={setShopName}
                                            setGoogleAddress={setGoogleAddress}
                                            setWebsite={setWebsite}
                                            setPlaceId={setPlaceId}
                                            setOpeningHours={setOpeningHours}
                                        />
                            </FormItem>

                                <FormItem
                                    label="Shop Name"
                                    invalid={errors.shopName && touched.shopName}
                                    errorMessage={errors.shopName}>

                                    <Field
                                        type="text"
                                        autoComplete="off"
                                        name="shopName"
                                        placeholder="Shop Name"
                                        component={Input}
                                />
                                </FormItem>

                                <FormItem
                                    label="Website"
                                    invalid={errors.website && touched.website}
                                    errorMessage={errors.website}>

                                    <Field
                                        type="text"
                                        autoComplete="off"
                                        name="website"
                                        placeholder="Website (Optional)"
                                        component={Input}
                                />
                                </FormItem>

                                <FormItem
                                    label="Phone Number"
                                    invalid={errors.website && touched.website}
                                    errorMessage={errors.website}>

                                    <Field
                                        type="text"
                                        autoComplete="off"
                                        name="phoneNumber"
                                        placeholder="Phone Number (Optional)"
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

export default ShopDetailForm

