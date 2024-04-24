
import { useEffect, useState } from 'react'
import  FormItem from 'components/ui/Form/FormItem'
import FormContainer from 'components/ui/Form/FormContainer'
import ButtonWithIcon from 'components/ui/custom/barbers/ButtonWithIcon';
import Select from 'components/ui/Select';
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import { Alert } from 'components/ui'
import Input from 'components/ui/Input';
import useBarberService from 'utils/hooks/CustomServices/useBarberService';
import { useSelector } from 'react-redux'
import useTaxAndSurchageService from 'utils/hooks/CustomServices/useTaxAndSurchageService';
import { Loading } from 'components/shared';
import useBusinesssService from 'utils/hooks/CustomServices/useBusinessService';

const validationSchema = Yup.object().shape({
})

const SchedulingLimitForm = () => {

    //Alert
    const [serverError, setServerError] = useState(false);
    const [serverErrorMessage, setServerErrorMessage] = useState(false);
    const [paddingInMinutes, setPaddingInMinutes] = useState(15);
    const [bookingWindowInWeeks, setBookingWindowInWeeks] = useState(26);
    const [barberShopDetail, setBarberShopDetail] = useState(null);
     
    const [loading, setLoading] = useState(false);
    const userInfo = useSelector((state) => state.auth.user);

    const options = [ 
        {value: 5, label: '5'},
        {value: 10, label: '10'},
        {value: 15, label: '15'},
        {value: 30, label: '30'},
        {value: 45, label: '45'},
        {value: 60, label: '60'}];
    
    const [selectedPaddingOption, setSelectedPaddingOption] = useState(options[3]);
    const handleChange = selectedOption => {
        const matchedIndex = options.findIndex(option => option.value === selectedOption.value);
        setSelectedPaddingOption(options[matchedIndex]);
        setPaddingInMinutes(selectedOption.value)
    };

    const { updateShopDetail } = useBusinesssService();
    const { fetchBarberShopDetail } = useBarberService();

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
            setServerError(true);
            setServerErrorMessage(response.message);
        }
        else {
            console.log("fetching shop detail response else", response);

            setBarberShopDetail(response);
        }
        setLoading(false);
    }

    useEffect(() => {
        fetchShopDetail();
    }, []);

    const handleUpdate = async(values)  => {

        console.log("handleUpdate ", values, barberShopDetail);

        if(barberShopDetail != null) {
            //we will start load
            setLoading(true);

            let barberShopUpdatedDetails = {
                barberShopName : barberShopDetail?.name,
                address: barberShopDetail?.address,
                phoneNumber : barberShopDetail?.phoneNumber,
                website: barberShopDetail.website,
                paddingInMinutes: paddingInMinutes,
                bookingWindowInWeeks: values?.bookingWindowInWeeks
            }

            console.log("barberShopUpdatedDetails ", barberShopUpdatedDetails);

            const response = await updateShopDetail(barberShopUpdatedDetails);

            if(response.status === -1) {
                showError(response.message);
            }
            else {
                fetchShopDetail();
            }

            setLoading(false);

        }


    };

    return (
        <div>

        <Loading loading={loading}>


            {serverError && (
                <div>
                    <Alert showIcon onClose={handleAlertClose} type="danger" title="Error!">
                        {serverErrorMessage}
                    </Alert>
                </div>
            )}
            <Formik
                initialValues={{
                    paddingInMinutes: barberShopDetail?.paddingInMinutes,
                    bookingWindowInWeeks: barberShopDetail?.bookingWindowInWeeks
                }}

                enableReinitialize
                validationSchema={validationSchema}
                onSubmit={(values, { resetForm, setSubmitting }) => {
                    setTimeout(() => {
                        // alert(JSON.stringify(values, null, 2))
                        setSubmitting(false)
                        resetForm()
                    }, 400)
                }}
            >
                {({ values, touched, errors, resetForm }) => (
                    <Form>

                        <FormContainer className="form-layout">
                            
                            <FormItem label="Padding" name="padding">

                                <span>Example: 15, will set your time slots to 9:00, 9:15, 9:30 and so on. </span>
                                    <Select
                                        placeholder="Select Padding"
                                        value={selectedPaddingOption}
                                        options={options}
                                        onChange={handleChange}
                                    ></Select>
                            </FormItem>

                            <FormItem label="Booking Window In Weeks" name="bookingWindowInWeeks">

                                <span>How many weeks in future you want to allow bookings.</span>
                                        <FormItem
                                            invalid={errors.bookingWindowInWeeks && touched.bookingWindowInWeeks}
                                            errorMessage={errors.bookingWindowInWeeks}>
                                            <Field
                                                type="number"
                                                name="bookingWindowInWeeks"
                                                placeholder="1-52"
                                                component={Input}
                                                min="1"
                                                max="52"
                                            />
                                        </FormItem>
                            </FormItem>

                            <div className='right-column'>
                                <ButtonWithIcon label="Update" onClick={() => handleUpdate(values)} className="update-button" />
                            </div>

                        </FormContainer>
                    </Form>
                )}
            </Formik>

        </Loading>

        </div>

        
    )
}

export default SchedulingLimitForm

