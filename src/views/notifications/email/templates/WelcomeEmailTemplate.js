
import  FormItem from 'components/ui/Form/FormItem'
import FormContainer from 'components/ui/Form/FormContainer'
import Input from 'components/ui/Input';
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import { useSelector } from 'react-redux'
import React, { useState } from 'react';
import ButtonWithIcon from 'components/ui/custom/barbers/ButtonWithIcon';
import { HiOutlineTrash } from 'react-icons/hi';



const validationSchema = Yup.object().shape({
    
})

const WelcomeEmailTemplate = () => {

    const userInfo = useSelector((state) => state.auth.user);

    const [textLines, setTextLines] = useState([]);

      // Function to handle adding a new line
      const addNewLine = () => {
        setTextLines([...textLines, ""]); // Add an empty string as a new line
    };

    // Function to update a specific line's text
    const updateLine = (index, newText) => {
        const newTextLines = [...textLines];
        newTextLines[index] = newText;
        setTextLines(newTextLines);
    };

    // Function to delete a specific line
    const deleteLine = (index) => {
        const newTextLines = textLines.filter((_, lineIndex) => lineIndex !== index);
        setTextLines(newTextLines);
    };

    // Function to handle form submission
    const handleSubmit = (event) => {
        event.preventDefault();
        // Here, send 'textLines' to your server
        console.log("Submitting:", textLines);
    };


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

                            <div>
                                {textLines.map((line, index) => (
                                    <div key={index} style={{ padding: '5px', display: 'flex', alignItems: 'center' }}>
                                        <textarea
                                            placeholder="Text area example"
                                            value={line}
                                            onChange={(e) => updateLine(index, e.target.value)}
                                            style={{ width: '100%', minHeight: '100px', padding: '5px', borderRadius: '5px' }}
                                        />

                                        <div style={{padding: '10px'}}  onClick={() => deleteLine(index)} >
                                            <HiOutlineTrash style={{padding: '10px', height: '42px', width: '42px'}} />
                                        </div>


                                    </div>
                                ))}

                                <ButtonWithIcon label="Add Line" onClick={() => addNewLine()} style={{ marginLeft: '10px', height: '42px', width: '42px' }} />
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

export default WelcomeEmailTemplate

