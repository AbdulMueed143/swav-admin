
import { useEffect, useState } from 'react'
import  FormItem from 'components/ui/Form/FormItem'
import FormContainer from 'components/ui/Form/FormContainer'
import ButtonWithIcon from 'components/ui/custom/barbers/ButtonWithIcon';
import Input from 'components/ui/Input';
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import { useSelector } from 'react-redux'
import { Alert } from 'components/ui'
import AddressAutocomplete from 'components/ui/custom/barbers/AddressAutocomplete'
import { values } from 'lodash';
import useBarberService from 'utils/hooks/CustomServices/useBarberService';
import useBusinesssService from 'utils/hooks/CustomServices/useBusinessService';

const validationSchema = Yup.object().shape({
})

const ShopDetailForm = () => {

    const [shopName, setShopName] = useState("");
    const [website, setWebsite] = useState("");
    const [placeId, setPlaceId] = useState("");
    const [address, setAddress] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [openingHours, setOpeningHours] = useState(null);
    const [state, setState] = useState("");
    const [city, setCity] = useState("");
    const [country, setCountry] = useState("");
    const [postCode, setPostCode] = useState("");
    const [latitude, setLat] = useState("");
    const [longitude, setLng] = useState("");


    const { updateShopDetail } = useBusinesssService();
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

    const handleUpdate = async(values)  => {
        //we will start load
        setLoading(true);

        let businessDetails = {
            barberShopName : values.shopName,
            phoneNumber: values.phoneNumber,
            address: {
                line1: values.address,
                state : values.state,
                postalCode: values.postcode,
                city: values.city,
                country : values.country,
                placeId : values.placeId,
            },
            website: values.website,
            longitude: longitude,
            latitude: latitude,
            openingHours: openingHours
        }

        const response = await updateShopDetail(businessDetails);

        if(response.status === -1) {
            showError(response.message);
        }
        // else {
        //     fetchHolidays();
        // }
    

        setLoading(false);
    };

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
            setBarberShopInfo(response);
        }

        //now show error or get the detail
        setLoading(false);
    }

    useEffect(() => {
        fetchShopDetail();
    }, []);

    useEffect(() => {
        setShopName(barberShopInfo?.name || "");
        setWebsite(barberShopInfo?.website || "");
        setAddress(barberShopInfo?.address?.country || "");
        setPhoneNumber(barberShopInfo?.phoneNumber || "");
        setState(barberShopInfo?.address?.state || "");
        setCity(barberShopInfo?.address?.city || "");
        setCountry(barberShopInfo?.address?.country || "");
        setPostCode(barberShopInfo?.address?.postalCode || "");
    }, [barberShopInfo]);

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
                    businessName: shopName,
                    shopName: shopName ,
                    country: country,
                    city: city,
                    postcode: postCode,
                    website: website,
                    state: state,
                    phoneNumber : phoneNumber,
                    address: address,
                    properties: {},
                    placeId: placeId
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
                {({ values, touched, errors, resetForm }) => (
                    <Form>
                        <FormContainer>

                            <FormItem
                                    label="Search Your Barber Shop To Point Via GPS"
                                    invalid={errors.shopName && touched.shopName}
                                    errorMessage={errors.shopName}>

                                <AddressAutocomplete 
                                            setBusinessName={setShopName}
                                            setGoogleAddress={setAddress}
                                            setWebsite={setWebsite}
                                            setPlaceId={setPlaceId}
                                            setOpeningHours={setOpeningHours}
                                            setPhoneNumber={setPhoneNumber}
                                            setState={setState}
                                            setCity={setCity}
                                            setPostCode={setPostCode}
                                            setCountry={setCountry}
                                            setLat={setLat}
                                            setLng={setLng}
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

                                <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}> 

                                    <FormItem
                                        label="Website"
                                        invalid={errors.website && touched.website}
                                        errorMessage={errors.website}
                                        style={{ flex: 1, flexBasis: '50%', padding: 0, margin: 0 }}>

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
                                        invalid={errors.phoneNumber && touched.phoneNumber}
                                        errorMessage={errors.phoneNumber}
                                        style={{ flex: 1, flexBasis: '50%', padding: 0, margin: 0 }}>
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name="phoneNumber"
                                            placeholder="Phone Number (Optional)"
                                            component={Input}
                                    />
                                    </FormItem>

                                </div>


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

                            
                                <div className='right-column' style={{marginRight : '1px'}}>
                                    <ButtonWithIcon label="Update" onClick={() => handleUpdate(values)} />
                                </div>
            
                        </FormContainer>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default ShopDetailForm

