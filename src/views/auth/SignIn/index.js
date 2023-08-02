import React from 'react'
import SignInForm from './SignInForm'
import logo from './../../../assets/images/logo.png'; // Adjust the path as needed


const SignIn = () => {
    return (
        <>

        <div className="center-content"> 
            <img src={logo} alt="SWAV Logo" className="logo" />

            <SignInForm disableSubmit={false} />
            </div>
        </>
    )
}

export default SignIn
