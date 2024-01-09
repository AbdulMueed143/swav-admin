
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

const validationSchema = Yup.object().shape({
})

const TaxAndSurchargeForm = () => {

    //Alert
    const [serverError, setServerError] = useState(false);
    const [serverErrorMessage, setServerErrorMessage] = useState(false);
    const [afterHoursAllowed, setAfterHoursAllowed] = useState(false);
    const [percentage, setPercentage] = useState(false);
    const [afterHoursInMinutes, setAfterHoursInMinutes] = useState(0);
    const [totalMinutes, setTotalMinues] = useState(0);
    const [loading, setLoading] = useState(false);

    const userInfo = useSelector((state) => state.auth.user);


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

        console.log("fetchShopDetail - fetchBarberShopDetail  ", response);
        console.log("fetchShopDetail - fetchBarberShopDetail  ", response.afterHourSurcharge);

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
                                            <div className="time-input-container">
                                                <FormItem
                                                    label="Your After Hours"
                                                    invalid={errors.afterHours && touched.afterHours}
                                                    errorMessage={errors.afterHours}>

                                                    <div className="time-fields">
                                                    <TimePicker
                                                        format="HH:mm" 
                                                        onChange={(time) => {

                                                            console.log(time);
                                                            if (time) {
                                                                const [hours, minutes] = time.format('HH:mm').split(':').map(Number);
                                                                const totalMinutes = (hours * 60) + minutes;
                                                                setTotalMinues(totalMinutes); // Assuming setStartTime is intended to store time in minutes
                                                            } else {
                                                                setTotalMinues(0);
                                                            }
                                                        }}  
                                                        minuteStep={15}
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

