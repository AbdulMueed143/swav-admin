import React, {useRef, useState} from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Button from "@mui/material/Button";
import Select from "components/ui/Select";
import DatePicker from 'components/ui/DatePicker'
import { FormItem, FormContainer } from 'components/ui'
import Input from 'components/ui/Input'
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'

const validationSchema = Yup.object().shape({
    shopName: Yup.string()
        .min(3, 'Too Short!')
        .max(255, 'Too Long!')
        .required('Please input user name 3 to 255 charachters.'),

    // description: Yup.string()
    //     .min(3, 'Too Short!')
    //     .max(500, 'Too Long!')
    //     .required('Please input user name 3 to 500 charachters.'),

    value: Yup
        .number()
        .required("Reward Value is required")
        .positive("Reward Value should be greater than 0")
        .integer("Reward Value should be an integer"),

    numberOfVisits: Yup
        .number()
        .required("Number of visits is required")
        .positive("Number of visits should be greater than 0")
        .integer("Number of visits should be an integer"),
})


 
export default function AddRewardDialog({open, handleToClose, handleToSaveReward}) {


    


    const formIkRef = useRef();
    const [expiryDate, setExpiryDate] = useState(null);
    const [selectedRewardSource, setSelectedRewardSource] = useState(null);
    const [selectedRewardType, setSelectedRewardType] = useState(null);

    const rewardTypes = [
        // { value: 'HAIRCUT', label: 'HAIRCUT' },
        // { value: 'ITEM', label: 'ITEM' },
        { value: 'CREDITS', label: 'CREDITS ($)' },
        { value: 'DISCOUNT', label: 'DISCOUNT (%)' },
    ];

    const rewardSources = [
        { value: 'EXTERNAL', label: 'EXTERNAL' },
        { value: 'SELF', label: 'SELF' },
        { value: 'COUPON', label: 'COUPON' },
    ];

    const rewardSource = [];

    return (
        <div stlye={{}}>
            <Dialog open={open} onClose={handleToClose}  fullWidth={true}
                PaperProps={{
                    style: {
                        minWidth: '400px', // Your desired minimum width
                        maxWidth: '600px', // Your desired maximum width
                    },
                }}> 
                <DialogTitle>{"Add Reward"}</DialogTitle>
                <DialogContent>

                <Formik
                    enableReinitialize
                    initialValues={{
                        shopName: '',
                        placeId: '',
                        description: '',
                        expiryDate: null,
                        value: 0,
                        numberOfVisits: 0,
                        rewardType: 'CREDITS',
                        rewardSource: 'EXTERNAL'
                    }}
                    validationSchema={validationSchema}
                    onSubmit={(values, { setSubmitting }) => {
                        // handleServiceSave(values); // Call handleServiceSave with form values
                        //lets validate false
                        setSubmitting(false);
                        
                    }}
                    innerRef={formIkRef}
                >

            {({ values, touched, errors, resetForm, submitForm }) => (
                <div>
                        <Form>
                            <FormContainer>

                                <div>
                                    <FormItem
                                        label="Reward Type"
                                        invalid={errors.rewardType && touched.rewardType}
                                        errorMessage={errors.rewardType}>
                                        <Select
                                                placeholder="Please Select Reward type"
                                                options={rewardTypes}
                                                onChange={(selectedRewardType) => {
                                                    setSelectedRewardType(selectedRewardType);
                                                }}
                                            ></Select>
                                    </FormItem>
                                </div>

                                <div>
                                    <FormItem
                                        label="Reward Source"
                                        invalid={errors.rewardSource && touched.rewardSource}
                                        errorMessage={errors.rewardSource}>
                                        <Select
                                                placeholder="Please Select Reward type"
                                                options={rewardSources}
                                                onChange={(selectedRewardSource) => {
                                                    setSelectedRewardSource(selectedRewardSource);
                                                }}
                                            ></Select>
                                    </FormItem>
                                </div>

                                <FormItem
                                    asterisk
                                    label="Expiry Date (No Expiry Date means it will never expire)"
                                    invalid={errors.expiryDate && touched.expiryDate}
                                    errorMessage={errors.expiryDate}>
                                        <DatePicker 
                                            name="expiryDate"
                                            onChange={(newDate) => {
                                                console.log("newDate ", newDate);
                                                setExpiryDate(newDate);
                                            }}
                                            placeholder="Pick a date" />
                                </FormItem>


                                <FormItem
                                    asterisk
                                    label="Shop Name"
                                    invalid={errors.shopName && touched.shopName}
                                    errorMessage={errors.shopName}>
                                    <Field
                                        type="text"
                                        name="shopName"
                                        placeholder="Shop Name"
                                        component={Input}
                                    />
                                </FormItem>


                                <FormItem
                                    asterisk
                                    label="Description"
                                    invalid={errors.description && touched.description}
                                    errorMessage={errors.description}>
                                    <Field
                                        type="text"
                                        name="description"
                                        placeholder="Description"
                                        component={Input}
                                    />
                                </FormItem>



                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div style={{ display: 'flex', flexDirection: 'column', width: '50%', paddingRight: '10px' }}>
                                        <FormItem
                                            asterisk
                                            label="Reward Value"
                                            invalid={errors.value && touched.value}
                                            errorMessage={errors.value}
                                        >
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <Field
                                                    type="number"
                                                    name="value"
                                                    placeholder="Reward Value"
                                                    component={Input}
                                                    inputMode="numeric"
                                                    min="0" // If you don't want negative values
                                                    step="1" // If you want to allow cents
                                                    style={{ flex: 1 }} // Make the input take as much space as possible
                                                />
                                            </div>
                                        </FormItem>
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', width: '50%', paddingLeft: '10px' }}>
                                        <FormItem
                                            asterisk
                                            label="Visits Required to Receive this reward"
                                            invalid={errors.numberOfVisits && touched.numberOfVisits}
                                            errorMessage={errors.numberOfVisits}
                                        >
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <Field
                                                    type="number"
                                                    name="numberOfVisits"
                                                    placeholder=""
                                                    component={Input}
                                                    step="1" // If you want to allow cents
                                                    min="1" // Assuming the minimum duration is 1 minute
                                                    style={{ flex: 1 }} // Make the input take as much space as possible
                                                />
                                            </div>
                                        </FormItem>
                                    </div>
                                </div>
                            </FormContainer>
                        </Form>

                        <DialogActions>
                            <Button onClick={handleToClose}
                                color="primary">
                                Cancel
                            </Button>
                            <Button onClick={() => handleToSaveReward(values, selectedRewardType, selectedRewardSource ,expiryDate)}
                                color="primary">
                                Save
                            </Button>
                        </DialogActions>
                    </div>
                    )}
                </Formik>

                </DialogContent>
                
            </Dialog>
        </div>
    );
}
