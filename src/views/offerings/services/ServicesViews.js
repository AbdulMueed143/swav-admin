import { ActionLink, CalendarView, Loading } from 'components/shared'
import { Calendar, Card } from 'components/ui'
import React from 'react'
import { useSelector } from 'react-redux'
import ServiceCard from './ServiceCard'
import ServicesGrid from './ServicesGrid'

const Home = () => {
    const userName = useSelector((state) => state.auth.user.userName)
    const loading = false
    return <>
        <div class="flex flex-col h-full">
            <Loading loading={loading} >
            <div class="flex flex-col xl:flex-row gap-4 mt-4">
                {/* ====CONTENT==== */}

            </div>
            
            </Loading>

            <div class="flex gap-4">

                <ServicesGrid />

            </div>
        </div>
    </>
}

export default Home
