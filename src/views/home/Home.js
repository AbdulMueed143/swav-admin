import { ActionLink, CalendarView, Loading } from 'components/shared'
import { Calendar } from 'components/ui'
import React from 'react'
import { useSelector } from 'react-redux'
import AppointmentTimeline from './timeline/AppointmentTimeline'
import { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import BaseMatrixCard from './basematrix/BaseMatrixCard'


const Home = () => {
    const userName = useSelector((state) => state.auth.user.userName)
    const loading = false

    const [appointmentsCount, setAppointmentsCount] = useState(0);
    const [totalEarnings, setTotalEarnings] = useState(0);
    const [customerCount, setCustomerCount] = useState(0);
    const [productSales, setProductSales] = useState(0);

    useEffect(() => {
        // Replace these with actual API calls or functions
        const api = {
            getAppointmentsCount: () => Promise.resolve(50),
            getTotalEarnings: () => Promise.resolve(10000),
            getCustomerCount: () => Promise.resolve(200),
            getProductSales: () => Promise.resolve(300),
        };

        api.getAppointmentsCount().then(setAppointmentsCount);
        api.getTotalEarnings().then(setTotalEarnings);
        api.getCustomerCount().then(setCustomerCount);
        api.getProductSales().then(setProductSales);
    }, []);


    const services = [
        { label: "New Customers", value: 13, description: "Total new customers today." },
        { label: "Bookings", value: 7, description: "Total bookings today." },
        { label: "Sales up", value: "15%", description: "Today." },

    ];

    return <>
        <div class="flex flex-col h-full">
            <Loading loading={loading} >
                <>
                <div className="flex gap-4 flex-wrap mt-4"> 
                    {services.map((matrix, index) => (
                        <div key={index} style={{ width: 300 }}>
                        <BaseMatrixCard label={matrix.label} value={matrix.value} description={matrix.description}></BaseMatrixCard>
                        </div>
                    ))}
                </div>
                </>

            <div class="flex flex-col xl:flex-row gap-4 mt-4">
                {/* ====CONTENT==== */}
                <div class="flex flex-col gap-4 flex-auto">
                    <div class="flex flex-col gap-4">
                    <Card>
                        <AppointmentTimeline />
                    </Card>
              

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

