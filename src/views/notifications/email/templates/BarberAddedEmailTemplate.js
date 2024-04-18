
import  FormItem from 'components/ui/Form/FormItem'
import FormContainer from 'components/ui/Form/FormContainer'
import Input from 'components/ui/Input';
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import { useSelector } from 'react-redux'


const validationSchema = Yup.object().shape({
    
})

const BarberAddedEmailTemplate = () => {

    const userInfo = useSelector((state) => state.auth.user);

    console.log(userInfo);

    return (
        <div>
            <Formik
                initialValues={{
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
                {({ touched, errors }) => (
                    <Form>
                        <FormContainer>
                            <div>

                            <div  style={{ padding: '5px', display: 'flex', height: '40px' }}>
                                <span style={{ marginRight: '10px' }}>Welcome to SWAV! 🚀</span>
                            </div>

                            <div  style={{ padding: '5px', display: 'flex', height: '40px' }}>
                                <span style={{ marginRight: '10px' }}>Hi (We will add customer name here)! 🚀</span>
                            </div>

                            <div  style={{ padding: '5px', display: 'flex', height: '40px' }}>
                                <span style={{ marginRight: '10px' }}>Congratulations on being added as barber by (We will add your shop name here)! 🚀</span>
                            </div>



                            <div  style={{ padding: '5px'}}>
                                
                                <FormItem
                                    invalid={errors.messageLine1 && touched.messageLine1}
                                    errorMessage={errors.messageLine1}
                                    >
                                    
                                    <Input placeholder="Text area example" value="We're thrilled to have you on board as part of our growing community of barbers and clients. With SWAV, you're joining a platform that's all about making your barbering experience better. Better for you, better for your clients! " textArea  /> 

                                </FormItem>
                            </div>

                            <div  style={{ padding: '5px', display: 'flex', height: '40px' }}>
                                <span style={{ marginRight: '10px' }}> Click following link to login as barber.(We will add login link here)! 🚀</span>
                            </div>

                            <div  style={{ padding: '5px', display: 'flex', height: '40px' }}>
                                <span style={{ marginRight: '10px' }}> And Use Your Temporary Password: (We will provide newly added barber with one time login password here)! 🚀</span>
                            </div>


                            <div  style={{ padding: '5px'}}>
                                
                                <FormItem
                                    invalid={errors.messageLine2 && touched.messageLine2}
                                    errorMessage={errors.messageLine2}
                                    >
                                    


                                    <Input placeholder="Text area example" value="If you ever have questions or need assistance, don't hesitate to reach out. We're here to make your journey with SWAV exceptional." textArea  /> 

                                </FormItem>
                            </div>

                            <div  style={{ padding: '5px'}}>
                                
                                <FormItem
                                    invalid={errors.messageLine3 && touched.messageLine3}
                                    errorMessage={errors.messageLine3}
                                    >

                                     <Input placeholder="Text area example" value="Thanks for choosing SWAV and joining the fam." textArea  /> 
 
                                </FormItem>
                            </div>

                            <div  style={{ padding: '5px', display: 'flex', height: '40px' }}>
                                <span style={{ marginRight: '10px' }}>Cheers</span>
                            </div>
                            <div  style={{ padding: '5px', display: 'flex', height: '40px' }}>
                                <span style={{ marginRight: '10px' }}>SWAV Team</span>
                            </div>
                            </div>
                            
                        </FormContainer>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default BarberAddedEmailTemplate

