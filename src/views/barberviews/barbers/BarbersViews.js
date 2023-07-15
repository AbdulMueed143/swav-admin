import { ActionLink, CalendarView, Loading } from 'components/shared'
import { Calendar, Card, Pagination } from 'components/ui'
import ButtonWithIcon from 'components/ui/custom/barbers/ButtonWithIcon'
import React from 'react'
import { useSelector } from 'react-redux'
import BarbersGrid from './BarbersGrid'

const Home = () => {
    const userName = useSelector((state) => state.auth.user.userName)
    const loading = false
    return <>
        <div class="flex flex-col h-full">
            <Loading loading={loading} >

            <div class="flex flex-col xl:flex-row gap-4 mt-4">
                {/* ====CONTENT==== */}
                
            </div>

            <BarbersGrid ></BarbersGrid>
            </Loading>
        </div>
    </>
}

export default Home
