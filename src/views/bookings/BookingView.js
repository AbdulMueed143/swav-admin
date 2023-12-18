import React from 'react'
import { Loading } from 'components/shared'

const Home = () => {
    const loading = false

    const services = [
        { label: "New Customers", value: 13, description: "Total new customers today." },
        { label: "Bookings", value: 7, description: "Total bookings today." },
        { label: "Sales up", value: "15%", description: "Today." },

    ];

    return <>
        <div class="flex flex-col h-full">
            <Loading loading={loading} >
               
            </Loading>
        </div>
    </>
}

export default Home
