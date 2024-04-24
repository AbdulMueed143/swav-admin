
import { useEffect, useState } from 'react'
import  FormItem from 'components/ui/Form/FormItem'
import FormContainer from 'components/ui/Form/FormContainer'
import ButtonWithIcon from 'components/ui/custom/barbers/ButtonWithIcon';
import Select from 'components/ui/Select';
import Input from 'components/ui/Input';
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import { Alert } from 'components/ui'
import { Switcher } from 'components/ui'
import { TimePicker } from 'antd';
import useBarberService from 'utils/hooks/CustomServices/useBarberService';
import { useSelector } from 'react-redux'
import useTaxAndSurchageService from 'utils/hooks/CustomServices/useTaxAndSurchageService';
import { Loading } from 'components/shared';
import moment, { weekdays } from 'moment';

const validationSchema = Yup.object().shape({
})

const SchedulingLimitForm = () => {

    //Alert
    const [serverError, setServerError] = useState(false);
    const [serverErrorMessage, setServerErrorMessage] = useState(false);
    const [afterHoursAllowed, setAfterHoursAllowed] = useState(false);
    const [percentage, setPercentage] = useState(false);
    const [afterHoursInMinutes, setAfterHoursInMinutes] = useState(0);
    const [totalMinutes, setTotalMinues] = useState(0);
    const [loading, setLoading] = useState(false);

    const userInfo = useSelector((state) => state.auth.user);
    const [paddingInMinutes, setPaddingInMinutes] = useState(30);

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
        // Perform any additional actions with the selected option
        setPaddingInMinutes(selectedOption.value)
    };



    const { updateAfterHourSurcharge } = useTaxAndSurchageService();
    const { fetchBarberShopDetail } = useBarberService();

    const handleAlertClose = () => {
        setServerError(false);
        setServerErrorMessage('');
    }

    const showError = (message) => {
        setServerError(true);
        setServerErrorMessage(message);
    }

    const onStatusSwitcherToggle = (checked) => {
        setAfterHoursAllowed(checked)
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
            setAfterHoursAllowed(response?.afterHourSurcharge?.afterHoursAllowed);
            setPercentage(response?.afterHourSurcharge?.percentage);
            setTotalMinues(convertMinutesToMoment(response?.afterHourSurcharge?.afterHoursInMinutes));
        }

        // now show error or get the detail 
        setLoading(false);
    }

    useEffect(() => {
        fetchShopDetail();
    }, []);

    const handleUpdate = async(values)  => {
        //we will start load
        setLoading(true);

        let businessDetails = {
            afterHoursAllowed : afterHoursAllowed == undefined ? false  :  afterHoursAllowed,
            percentage: values.percentage,
            afterHoursInMinutes : totalMinutes
        }

        const response = await updateAfterHourSurcharge(businessDetails);

        if(response.status === -1) {
            showError(response.message);
        }
        else {
            fetchShopDetail();
        }

        setLoading(false);
    };


    function convertMinutesToMoment(currentMinutes) {
        const hours = Math.floor(currentMinutes / 60);
        const minutes = currentMinutes % 60;
        console.log("totalMinutes ",currentMinutes,"hour ", hours, " minutes ", minutes);
        return moment().hours(hours).minutes(minutes);
    }
    

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
                    percentage: percentage,
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

                                    <Select
                                        placeholder="Select Booking Window"
                                        value={selectedPaddingOption}
                                        options={options}
                                        onChange={handleChange}
                                    ></Select>
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

