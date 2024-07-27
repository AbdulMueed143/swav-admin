
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
import ButtonWithIcon from 'components/ui/custom/barbers/ButtonWithIcon';
import useBarberService from 'utils/hooks/CustomServices/useBarberService';
import { Loading } from 'components/shared';


const validationSchema = Yup.object().shape({

})

const CancellationPolicyForm = () => {

    const barberInfo = useSelector((state) => state.auth.user);
    const [loading, setLoading] = useState(false);
    const [barberShopDetail, setBarberShopDetail] = useState(false);

    const { fetchBarberShopDetail, updateBarberShopCancellationPolicies } = useBarberService();

    const handleUpdate = async(values)  => {

            let payload = {
                cancellationPolicy : values.cancellationPolicy,
            }
            const response = await updateBarberShopCancellationPolicies(payload);

            if(response.status == -1) {
                
            }
            else {
                await fetchShopDetail();
            }

    }

    //now we will get the shop details
    const fetchShopDetail = async() =>  {
        setLoading(true);
        const response = await fetchBarberShopDetail(barberInfo.barberShopId);

        if(response.status == -1) {
        }
        else {
            console.log("fetching shop detail response else", response);
            setBarberShopDetail(response);
        }
        setLoading(false);
    }

    useState(async () =>  {
        await fetchShopDetail();
    } , []);


    //We might have to allow users to attach the file eventually .....
    return (
        <div>
            <Loading loading={loading}>
                <Formik
                    initialValues={{
                        cancellationPolicy: barberShopDetail?.cancellationPolicy?.policy ?? ""
                    }}
                    validationSchema={validationSchema}
                    onSubmit={(values, { resetForm, setSubmitting }) => {
                        setTimeout(() => {
                            setSubmitting(false)
                            resetForm()
                        }, 400)
                    }}
                >
                    {({ touched, errors, values }) => (
                        <Form>
                            <FormContainer>
                                <FormItem
                                        label="Cancellation Policy"
                                        invalid={errors.cancellationPolicy && touched.cancellationPolicy}
                                        errorMessage={errors.cancellationPolicy}
                                    >
                                    <Field
                                        asterick
                                        type="text"
                                        autoComplete="off"
                                        name="cancellationPolicy"
                                        placeholder="Cancellation Policy"
                                        component={Input}
                                        textArea

                                    />
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

export default CancellationPolicyForm

