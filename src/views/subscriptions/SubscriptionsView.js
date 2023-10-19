import { ActionLink, CalendarView, Loading } from 'components/shared'
import { Calendar } from 'components/ui'
import React from 'react'
import { Card, CardContent, Typography, Box } from '@mui/material';
import SubscriptionGrid from './SubscriptionGrid';

const Home = () => {
    // const userName = useSelector((state) => state.auth.user.userName)
    const loading = false

    return <>
        <div class="flex flex-col h-full">
            <Loading loading={loading} >
               

            <div class="flex flex-col xl:flex-row gap-4 mt-4">
                {/* ====CONTENT==== */}
               
                <div class="flex flex-col gap-4">

                    <SubscriptionGrid  />
                </div>
            </div>
            </Loading>
        </div>
    </>
}

export default Home
