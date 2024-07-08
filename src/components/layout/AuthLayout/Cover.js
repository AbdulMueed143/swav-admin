import React, { cloneElement } from 'react'
import { APP_NAME } from 'constants/app.constant'
import barberVideo from './../../../assets/videos/barber_vid.mp4';


const Cover = ({ children, content, ...rest }) => {
    return (
        <div className="grid lg:grid-cols-2 h-full">
            <div className="bg-no-repeat bg-cover py-6 px-16 flex-col justify-between bg-white dark:bg-gray-800 hidden lg:flex video-container">
            <video autoPlay="autoplay" loop="loop" muted className="fullscreen-video">
                <source src={barberVideo} type="video/mp4" />
            </video> 
            </div> 
               
            <div className="flex flex-col justify-center items-center bg-white dark:bg-gray-800">
                <div className="xl:min-w-[450px] px-8">
                    <div className="mb-8">{content}</div>
                    {children ? cloneElement(children, { ...rest }) : null}
                </div>
            </div>
        </div>
    )
}

export default Cover
