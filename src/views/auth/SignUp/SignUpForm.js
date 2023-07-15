import React,  { useState, useRef } from 'react'
import { Input, Button, FormItem, FormContainer, Alert } from 'components/ui'
import { PasswordInput, ActionLink } from 'components/shared'
import useTimeOutMessage from 'utils/hooks/useTimeOutMessage'
import { Field, Form, Formik, useFormikContext, FormikStep } from 'formik'
import * as Yup from 'yup'
import useAuth from 'utils/hooks/useAuth'
import BarberShopAutocomplete from 'components/ui/custom/barbers/BarbershopAutocomplete'
import AddressAutocomplete from 'components/ui/custom/barbers/AddressAutocomplete'
import SelectableCard from './SelectableCard'
import Stepper from '../Stepper'
import { setSignedIn } from 'store/auth/sessionSlice'
import { last, values } from 'lodash'


{/* <script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=AIzaSyB01eSc8cHSkUO3H1HXBiaeGWE8qBJcjoI&libraries=places"></script> */}

// We are using following for the auto complete of places api 
// https://www.npmjs.com/package/react-google-autocomplete

const accountInformationSchemaValidation = Yup.object().shape({
//     email: Yup.string().email().required('Please enter your email'),
//     phoneNumber: Yup.string()
//     .required("Phone number is required")
//     .matches(/^[0-9]{9,}$/, "Phone number must be at least 9 digits"),
// password: Yup.string()
//     .required('Please enter your password')
//     .matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{6,}$/, "Password must be at least 6 characters and include at least 1 uppercase letter"),
// confirmPassword: Yup.string()
//     .oneOf(
//         [Yup.ref('password'), null],
//         'Your passwords do not match'
//     )
})

const businessTypeSchemaValidation = Yup.object().shape({
    selectedCard: Yup.string()
      .oneOf(['individual', 'b2plus', 'b5plus'], 'Please select a valid card')
      .required('You must select at least one card')
  });

const businessDetailSchemaValidation = Yup.object().shape({
    address: Yup.string().required('Please enter your address'),
})

const validationSchemas = [
    accountInformationSchemaValidation,
    businessTypeSchemaValidation,
    businessDetailSchemaValidation
]


const SignUpForm = (props) => {

    //References
    const formIkRef = useRef();

    //Declaration of variables
    const { disableSubmit = false, className, signInUrl = '/sign-in' } = props
    const { signUp, createAccount, updateBusinessDetails } = useAuth()
    const [ message, setMessage ] = useTimeOutMessage()

    //Variables
    const [step, setStep] = useState(0);

    const [name, setName] = useState("");
    const [firstname, setFirstName] = useState("");
    const [lastname, setLastName] = useState("");
    const [address, setAddress] = useState("");
    const [placeId, setPlaceId] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [website, setWebsite] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] =useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [selectedCard, setSelectedCard] = useState('individual');

    //Cards selection
    const handleCardClick = (cardType) => {
        setSelectedCard(cardType);
    };

    //Breaking the signup processs, use following methods
    const onAccountDetailsUpdate = async (values) => {
        const { firstname, lastname, name, address, phoneNumber, placeId, password, email } = values
        formIkRef.current.setSubmitting(true)
        var result = null

        if (selectedCard === "individual") {
            // Map values to API expected variables
            const apiValues = {
                email: email,
                address: {
                    "line1": address,
                    "placeId": placeId
                },
                businessType: "INDIVIDUAL",
                properties : {
                    "firstname": firstname,
                    "lastname": lastname,
                    "password": password

                }
            };

            result = await updateBusinessDetails(apiValues)
        }
        else {

            const apiValues = {
                email: email,
                address: {
                    "line1": address,
                    "placeId": placeId
                },
                businessType: "SHOP",
                properties : {
                    "name": name
                }
            };

            result = await updateBusinessDetails(apiValues)
        }


        //depending on the result we will either show error or next step ...
        if (result.status === 'success') {
        }
        else {
            formIkRef.current.setSubmitting(false)
            setMessage(result.message)
        }

    }
    
    //Breaking the signup processs, use following methods
    const onRegisterAccount = async (values, setSubmitting) => {
        const { phoneNumber, password, email } = values
        // Map values to API expected variables
        const apiValues = {
            ownerPhoneNumber: phoneNumber,
            ownerPassword: password,
            ownerEmail: email,
        };
        const result = await createAccount(apiValues)
        
        console.log(result);
        formIkRef.current.setSubmitting(false)
        //depending on the result we will either show error or next step ...
        if (result.status === 'success') {
            nextStep();
        }
        else {
            console.log("Here we go")
            setMessage(result.message)
        }

    }

    //Moving in steps
    const nextStep = () => {
        // if(formIkRef.current.isValid) {
            setStep(step + 1);
        // }
    };
    
    const prevStep = () => {
        setStep(step - 1);
    };

    return (
        <div className={className} style={{ padding:'10px', display: 'flex', flexDirection: 'column', height: '100vh' }}>

            {/* {message && (
                <Alert className="mb-4" type="danger" showIcon>
                    {message}
                </Alert>
            )} */}

            <div style={{ flex: 1 }}>
                <Stepper currentStep={step} />
             </div>

             <div style={{ flex: 6, overflowY: 'auto', padding: '2px'  }}>
                <Formik
                    initialValues={{
                        name: '',
                        password: '',
                        confirmPassword: '',
                        address: '',
                        phoneNumber: '',
                        email: '',
                        address: '',
                        placeId: ''
                    }}
                    onSubmit={(values) => {
                        onRegisterAccount(values); // Call onRegisterAccount when form is submitted and valid
                      }}

                    validationSchema={validationSchemas[step]}
                    innerRef={formIkRef}
                >
                    {({ touched, errors, isSubmitting, values }) => (
                        <Form >
                            
                            <FormContainer>

                                {step === 0 && (
                                <>
                                <FormItem
                                    label="Email"
                                    invalid={errors.email && touched.email}
                                    errorMessage={errors.email}>

                                    <Field
                                        type="email"
                                        autoComplete="off"
                                        name="email"
                                        placeholder="Email"
                                        component={Input}
                                />
                                </FormItem>

                                <FormItem
                                    label="Phone Number"
                                    invalid={errors.phoneNumber && touched.phoneNumber}
                                    errorMessage={errors.phoneNumber}>
                                    <Field
                                        type="text"
                                        autoComplete="off"
                                        name="phoneNumber"
                                        placeholder="Phone Number"
                                        component={Input}
                                    />
                                </FormItem>

                                
                                <FormItem
                                    label="Password"
                                    invalid={errors.password && touched.password}
                                    errorMessage={errors.password}
                                >
                                    <Field
                                        autoComplete="off"
                                        name="password"
                                        placeholder="Password"
                                        component={PasswordInput}
                                    />
                                </FormItem>
                                <FormItem
                                    label="Confirm Password"
                                    invalid={
                                        errors.confirmPassword &&
                                        touched.confirmPassword
                                    }
                                    errorMessage={errors.confirmPassword}
                                >
                                    <Field
                                        autoComplete="off"
                                        name="confirmPassword"
                                        placeholder="Confirm Password"
                                        component={PasswordInput}
                                    />
                                </FormItem>

                                    <Button
                                    block
                                    loading={isSubmitting}
                                    variant="solid"
                                    type="submit"
                                    onClick={(event) => { 
                                        event.preventDefault(); 
                                        onRegisterAccount(values);
                                    }}
                                   >
                                    {isSubmitting
                                        ? 'Creating Account...'
                                        : 'Create Account'}
                                </Button>
                                    </>

                                )}

                                {step === 1 && (
                                    <>

                                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>

                                        <SelectableCard
                                            title="Individual"
                                            description="Solo barber working as freelancer from home."
                                            selected={selectedCard === 'individual'}
                                            onClick={() => handleCardClick('individual')}
                                        />

                                        <SelectableCard
                                            title="Barber Shop"
                                            description="With 2+ barbers."
                                            selected={selectedCard === 'b2plus'}
                                            onClick={() => handleCardClick('b2plus')}
                                            style="margin-left:20px; margin-bottom:20px;"

                                        />

                                        <SelectableCard
                                            title="Barber Shop"
                                            description="With 5+ barbers."
                                            selected={selectedCard === 'b5plus'}
                                            onClick={() => handleCardClick('b5plus')}
                                            style="margin-left:20px; margin-bottom:20px;"

                                        />

                                    </div>

                                    
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        {/* <Button variant="solid" style={{ flex: 1, marginRight: '8px' }} onClick={prevStep}>
                                            Previous
                                        </Button> */}
                                        <Button variant="solid" style={{ flex: 1, marginLeft: '8px' }} onClick={nextStep}>
                                            Next
                                        </Button>
                                    </div>

                                    </>
                                )}

                                {step === 2 && selectedCard ===  'individual' && (
                                    <>

                                    <FormItem
                                        label="First Name"
                                        invalid={errors.firstname && touched.firstname}
                                        errorMessage={errors.firstname}
                                    >
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name="firstname"
                                            placeholder="First Name"
                                            component={Input}
                                    
                                        />
                                    </FormItem>
                                    <FormItem
                                        label="Last Name"
                                        invalid={errors.lastname && touched.lastname}
                                        errorMessage={errors.lastname}
                                    >
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name="lastname"
                                            placeholder="Last Name"
                                            component={Input}
                                    
                                        />
                                    </FormItem>
                                    <FormItem
                                        label="Find Your Address"
                                        invalid={errors.address && touched.address}
                                        errorMessage={errors.address}
                                    >
                                        <AddressAutocomplete 
                                            setName={setName}
                                            setAddress={setAddress}
                                            setWebsite={setWebsite}
                                        />
                                    </FormItem>


                                    <FormItem
                                        label="Upload Logo"
                                        invalid={errors.phoneNumber && touched.phoneNumber}
                                        errorMessage={errors.phoneNumber}
                                    >
                                        <Field
                                            type="file"
                                            autoComplete="off"
                                            name="logo"
                                            component={Input}
                                        />
                                    </FormItem>

                                    
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <Button variant="solid" style={{ flex: 1, marginRight: '8px' }} onClick={prevStep}>
                                            Previous
                                        </Button>
                                        <Button variant="solid" type="submit" style={{ flex: 1, marginLeft: '8px' }} 
                                        onClick={(event) => { 
                                            event.preventDefault(); 
                                            onAccountDetailsUpdate(values);
                                        }}
                                        >
                                        {isSubmitting
                                        ? 'Completing Registration'
                                        : 'Complete'}
                                        </Button>
                                    </div>
                                    </>
                                )}

                                {step === 2 && selectedCard !==  'individual' && (
                                    <>

                                    <FormItem
                                        label="Find Your Shop"
                                        invalid={errors.shopName && touched.shopName}
                                        errorMessage={errors.shopName}
                                    >
                                        <BarberShopAutocomplete 
                                            setName={setName}
                                            setAddress={setAddress}
                                            setWebsite={setWebsite}
                                        />
                                    </FormItem>

                                    <FormItem
                                        label="Upload Logo"
                                        invalid={errors.phoneNumber && touched.phoneNumber}
                                        errorMessage={errors.phoneNumber}
                                    >
                                        <Field
                                            type="file"
                                            autoComplete="off"
                                            name="logo"
                                            component={Input}
                                        />
                                    </FormItem>

                                    <FormItem
                                        label="Name"
                                        invalid={errors.name && touched.name}
                                        errorMessage={errors.name}
                                    >
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name="name"
                                            placeholder="Name"
                                            component={Input}
                                            value={name}
                                            onChange={e => setAddress(e.target.value)}
                                        />
                                    </FormItem>

                                    <FormItem
                                        label="Shop Address"
                                        invalid={errors.address && touched.address}
                                        errorMessage={errors.address}
                                    >
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name="address"
                                            placeholder="Shop Address"
                                            component={Input}
                                            value={address}
                                            onChange={e => setAddress(e.target.value)}
                                        />
                                    </FormItem>
                                    
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <Button variant="solid" style={{ flex: 1, marginRight: '8px' }} onClick={prevStep}>
                                            Previous
                                        </Button>
                                        <Button variant="solid" type="submit" style={{ flex: 1, marginLeft: '8px' }} 
                                        onClick={(event) => { 
                                            event.preventDefault(); 
                                            onAccountDetailsUpdate(values);
                                        }}>
                                        {isSubmitting
                                        ? 'Completing Registration'
                                        : 'Complete'}
                                        </Button>
                                    </div>
                                    </>
                                )}
                            
                                <div className="mt-4 text-center">
                                    <span>Already have an account? </span>
                                    <ActionLink to={signInUrl}>Sign in</ActionLink>
                                </div>
                            </FormContainer>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    )
}

export default SignUpForm
