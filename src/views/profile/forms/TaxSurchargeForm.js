
import { useEffect, useState } from 'react'
import  FormItem from 'components/ui/Form/FormItem'
import FormContainer from 'components/ui/Form/FormContainer'
import ButtonWithIcon from 'components/ui/custom/barbers/ButtonWithIcon';
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
import TimeInput from 'components/ui/TimeInput'

const validationSchema = Yup.object().shape({
})

const TaxAndSurchargeForm = () => {

    //Alert
    const [serverError, setServerError] = useState(false);
    const [serverErrorMessage, setServerErrorMessage] = useState(false);
    const [afterHoursAllowed, setAfterHoursAllowed] = useState(false);
    const [percentage, setPercentage] = useState(false);
    // const [afterHoursInMinutes, setAfterHoursInMinutes] = useState(0);
    const [totalMinutes, setTotalMinues] = useState(0);
    const [loading, setLoading] = useState(false);

    const userInfo = useSelector((state) => state.auth.user);

    const { updateAfterHourSurcharge } = useTaxAndSurchageService();
    const { fetchBarberShopDetail } = useBarberService();

    const [timeValue, setTimeValue] = useState(null);


    const handleTimeChange = (time) =>  {
        console.log("Time selected ", time);
        if (time) {
            const match = moment(time).format('hh:mm a').match(/(\d+):(\d+)\s*(AM|PM)/i);
            if(!match) {
                console.log("Time formate issue ", match);
                setTotalMinues(0);
            }
            else {
                let [_, hours, minutes, period] = match;
                hours = parseInt(hours, 10);
                minutes = parseInt(minutes, 10);
                // Convert hours to 12-hour format and calculate total minutes
                if (period.toUpperCase() === 'PM' && hours !== 12) {
                    hours += 12;
                } else if (period.toUpperCase() === 'AM' && hours === 12) {
                    hours = 0;
                }

                let totalMinutes = hours * 60 + minutes;
                console.log("Total Minutes setup ", totalMinutes);
                setTotalMinues(totalMinutes);
            }
        } else {
            setTotalMinues(0);
        }
    };
    


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

    function setTimeFromMinutes(totalMinutes) {
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        
        return moment().startOf('day').add({hours: hours, minutes: minutes}); // You might use this return value to set your state or do other operations
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
            console.log("Fetched new shop data ", new Date(setTimeFromMinutes(response?.afterHourSurcharge?.afterHoursInMinutes)));
            setAfterHoursAllowed(response?.afterHourSurcharge?.afterHoursAllowed);
            setPercentage(response?.afterHourSurcharge?.percentage);
            setTotalMinues(response?.afterHourSurcharge?.afterHoursInMinutes);
            var newValue = new Date(setTimeFromMinutes(response?.afterHourSurcharge?.afterHoursInMinutes));
            setTimeValue(newValue);
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

        console.log("response ", response);

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
                                        
                                    <div className="switcher-container">
                                        <Switcher  
                                            checkedContent="Allow After Hours"
                                            unCheckedContent="Do not Allow After Hours"
                                            className="custom-switcher" 
                                            defaultChecked={afterHoursAllowed}
                                            onChange={(checked) => onStatusSwitcherToggle(checked)} 
                                        />
                                    </div>

                                        {afterHoursAllowed && (
                                            <div >
                                                <FormItem
                                                    label="Your After Hours"
                                                    invalid={errors.afterHours && touched.afterHours}
                                                    errorMessage={errors.afterHours}>

                                                    <div className="time-fields">
                                                        <TimeInput 
                                                            format="12" 
                                                            key={timeValue} 
                                                            defaultValue={timeValue} 
                                                            onChange={handleTimeChange} clearable={false}  
                                                        />
                                                    </div>
                                                </FormItem>

                                                <FormItem
                                                    label="Percentage of Surcharge on After Hours"
                                                    invalid={errors.percentage && touched.percentage}
                                                    errorMessage={errors.percentage}>

                                                    <Field
                                                        type="number"
                                                        name="percentage"
                                                        placeholder="0-100"
                                                        component={Input}
                                                        min="0"
                                                        max="100"
                                                    />
                                                </FormItem>
                                            </div>
                                        )}


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

export default TaxAndSurchargeForm

