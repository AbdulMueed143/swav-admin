import React, { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Button from "@mui/material/Button";
import { FormItem, FormContainer } from 'components/ui';
import Input from 'components/ui/Input'
import { Field, Form, Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup'
import Select from 'components/ui/Select'
import useBookingServices from 'utils/hooks/useBookingService'

const addBarberFormValidationSchema = Yup.object().shape({
    barberFirstName: Yup.string().required('Firstname Required'),
    barberLastName: Yup.string().required('Lastname Required'),
    barberEmail: Yup.string().email().required('Please enter your email'),
    barberPhoneNumber: Yup.string()
        .required('Phone number is required')
        .matches(/^[0-9]{9,}$/, 'Phone number must be at least 9 digits'),
    photo: Yup
        .mixed()
        .required("Required")
        .test("is-valid-type", "Not a valid image type",
            value => isValidFileType(value && value.name.toLowerCase(), "image"))
        .test("is-valid-size", "Max allowed size is 100KB",
            value => value && value.size <= MAX_FILE_SIZE)
});

const isValidFileType = (fileName, fileType) => {
    const allowedExtensions = ["jpeg", "jpg", "png", "gif"];
    const fileExtension = fileName.split(".").pop();
    return allowedExtensions.includes(fileExtension) && fileType === "image";
};

const PreviewFile = ({ file, width, height }) => {

    const [preview, setPreview] = React.useState(null);
    const reader = new FileReader();
    reader.readAsDataURL(file);

    function isFileImage(file) {
        return file && file['type'].split('/')[0] === 'image';
    }

    reader.onload = () => {
        setPreview(isFileImage(file) ? reader.result : "/default.svg");
    };

    return (
        <div className='preview-container'>
            <img src={preview} className='preview' alt="Preview" width={width} height={height} />
            <label>{file.name}</label>
        </div>
    )
}

const allowedExts = ".jpeg, .jpg, .png, .gif";

const MAX_FILE_SIZE = 102400;

export default function AddBarberModal({ open, handleToSave, handleToClose }) {

    const { getServices } = useBookingServices();
    const [services, setServices] = useState([]); // Initial state as an empty array
    const [selectedAmenities, setSelectedAmenities] = React.useState([]);
    // const { setFieldValue } = useFormikContext();
    // photo file
    const [selectedFile, setSelectedFile] = useState(null);
    const [fileErrorMessage, setFileErrorMessage] = useState(''); // State for file error message


    // Define a function to fetch and update the services
    const fetchServices = async () => {
        const data = await getServices();
        setServices(data);
        setSelectedAmenities(data);
    };

    useEffect(() => {
        // Call fetchServices on component mount
        fetchServices();
    }, []); // Empty dependency array means the effect will only run once

    // Map your services array to an array of options
    const serviceMap = services.map(service => ({
        value: service.name,
        label: service.name,
    }));

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFileErrorMessage('');

        if (!selectedFile) {
            setFileErrorMessage('No file selected.');
            return;
        }

        // Validate file type
        const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
        const maxFileSize = 5 * 1024;

        if (!validTypes.includes(selectedFile.type)) {
            setFileErrorMessage('Invalid file type. Only JPEG, PNG, and GIF are allowed.');
            setSelectedFile(null); // Reset the selected file
        } else if (selectedFile.size > maxFileSize) {
            setFileErrorMessage("File size should be less than 5 MB.");
            setSelectedFile(null);
        } else {
            setSelectedFile(selectedFile);
        }
    };

    return (
        <div stlye={{}}>
            <Dialog open={open} onClose={handleToClose} fullWidth={true}
                PaperProps={{
                    style: {
                        minWidth: '400px', // Your desired minimum width
                        maxWidth: '600px', // Your desired maximum width
                    },
                }}>
                <DialogTitle>{"Add Barber"}</DialogTitle>
                <DialogContent>

                    <Formik
                        enableReinitialize
                        initialValues={{
                            firstName: '',
                            lastName: '',
                            phoneNumber: '',
                            email: '',
                            bookingWindowInWeeks: '2',
                            amenities: services,
                            photo: '',
                            about: '',
                        }}
                        validationSchema={addBarberFormValidationSchema}
                        onSubmit={(values, { setSubmitting }) => {
                            setSubmitting(false);
                        }}
                    >
                        {({ formik, values, touched, errors, resetForm }) => (

                            <div>
                                <Form>
                                    <FormContainer>
                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <FormItem

                                                label="First Name"
                                                invalid={errors.barberFirstName && touched.barberFirstName}
                                                errorMessage={errors.barberFirstName}
                                            >
                                                <Field
                                                    asterick
                                                    type="text"
                                                    autoComplete="off"
                                                    name="barberFirstName"
                                                    placeholder="First Name"
                                                    component={Input}

                                                />
                                            </FormItem>
                                            <div style={{ width: "10px" }}> </div>
                                            <FormItem
                                                required
                                                label="Last Name"
                                                invalid={errors.barberLastName && touched.barberLastName}
                                                errorMessage={errors.barberLastName}
                                            >
                                                <Field
                                                    type="text"
                                                    autoComplete="off"
                                                    name="barberLastName"
                                                    placeholder="Last Name"
                                                    component={Input}
                                                />
                                            </FormItem>

                                        </div>

                                        <FormItem
                                            asterisk
                                            label="Email"
                                            invalid={errors.barberEmail && touched.barberEmail}
                                            errorMessage={errors.barberEmail}
                                        >
                                            <Field
                                                type="text"
                                                name="barberEmail"
                                                placeholder="Email"
                                                component={Input}
                                            />
                                        </FormItem>

                                        <FormItem
                                            asterisk
                                            label="Phone Number"
                                            invalid={errors.barberPhoneNumber && touched.barberPhoneNumber}
                                            errorMessage={errors.barberPhoneNumber}
                                        >
                                            <Field
                                                type="text"
                                                name="barberPhoneNumber"
                                                placeholder="Phone Number"
                                                component={Input}
                                            />
                                        </FormItem>

                                        <FormItem
                                            label="Services"
                                            invalid={errors.amenities && touched.amenities}
                                            errorMessage={errors.amenities}
                                        >
                                            <Select
                                                isMulti
                                                placeholder="Please Select"
                                                defaultValue={serviceMap}
                                                options={serviceMap}
                                                onChange={(selectedOptions) => {
                                                    // Get selected amenities from services list using the selected names
                                                    const selectedAmenities = selectedOptions.map(option => {
                                                        return services.find(service => service.name === option.value);
                                                    });

                                                    setSelectedAmenities(selectedAmenities);

                                                }}
                                            />
                                        </FormItem>

                                        <FormItem
                                            label="Advance Booking Window in Weeks (1-52)"
                                            invalid={errors.bookingWindowInWeeks && touched.bookingWindowInWeeks}
                                            errorMessage={errors.bookingWindowInWeeks}
                                        >
                                            <Field
                                                type="number" // Change the type to 'number' to allow only numeric inputs
                                                name="bookingWindowInWeeks" // Make sure the 'name' attribute corresponds to your data model
                                                placeholder="Enter weeks (1-52)"
                                                component={Input}
                                                min="1"  // Set the minimum value to 1
                                                max="52" // Set the maximum value to 52
                                            />
                                        </FormItem>
                                        {/* {fileErrorMessage && <div style={{ color: 'red' }}>{fileErrorMessage}</div>} */}
                                        {/* <FormItem
                                            label="Upload picture"
                                            invalid={errors.photo && touched.photo}
                                            errorMessage={errors.photo}
                                        >
                                            <Field
                                                type="file"
                                                autoComplete="off"
                                                name="photo"
                                                component={Input}
                                            // onChange={handleFileChange}
                                            />
                                        </FormItem> */}
                                        <>
                                            <div className="button-wrap">
                                                <label className="button label" htmlFor="photo">
                                                    <span>Upload photo</span>
                                                    <span className="ext">[{allowedExts}]</span>
                                                </label>
                                                <input
                                                    id="photo"
                                                    name="photo"
                                                    type="file"
                                                    accept={allowedExts}
                                                    onChange={(event) => {
                                                        formik.setFieldValue('photo', event.target.files[0]);
                                                    }}
                                                />
                                                {formik.values["photo"] ? (
                                                    <PreviewFile className={{ margin: 'auto' }} width={50} height={"auto"} file={formik.values["photo"]} />
                                                ) : null}
                                            </div>
                                            <div className="error">
                                                <ErrorMessage name="photo" />
                                            </div>
                                        </>

                                        <FormItem
                                            label="About"
                                            invalid={errors.amenities && touched.about}
                                            errorMessage={errors.about}
                                        >
                                            <Field
                                                type="text"
                                                name="about"
                                                placeholder="About Barber"
                                                component={Input}
                                            />
                                        </FormItem>


                                    </FormContainer>
                                </Form>

                                <DialogActions>
                                    <Button onClick={handleToClose} color="primary">
                                        Cancel
                                    </Button>
                                    <Button onClick={() => handleToSave(values, selectedAmenities)} color="primary">
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



