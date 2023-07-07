import { ActionLink, CalendarView, Loading } from 'components/shared'
import { Calendar, Card } from 'components/ui'
import React from 'react'
import { useSelector } from 'react-redux'

const Home = () => {
    const userName = useSelector((state) => state.auth.user.userName)
    const loading = false
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
