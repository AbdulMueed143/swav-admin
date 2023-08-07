import { ActionLink, CalendarView, Loading } from 'components/shared'
import { Calendar } from 'components/ui'
import React from 'react'
import { useSelector } from 'react-redux'
import AppointmentTimeline from './timeline/AppointmentTimeline'
import { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Box } from '@material-ui/core';
import BaseMatrixCard from './basematrix/BaseMatrixCard'

const Subscriptions = () => {
    const userName = useSelector((state) => state.auth.user.userName)
    const loading = false

    const subscriptions = [
        { label: "New Customers", value: 13, description: "Total new customers today." },
        { label: "Bookings", value: 7, description: "Total bookings today." },
        { label: "Sales up", value: "15%", description: "Today." },

    ];

    return <>
        <div class="flex flex-col h-full">
            <Loading loading={loading} >
               

            <div class="flex flex-col xl:flex-row gap-4 mt-4">
                {/* ====CONTENT==== */}
                <div class="flex flex-col gap-4 flex-auto">
                    <div class="flex flex-col gap-4">
                   
                    </div>
                </div>
                <div class="flex flex-col gap-4">
                </div>
            </div>
            </Loading>
        </div>
    </>
}

export default Home
