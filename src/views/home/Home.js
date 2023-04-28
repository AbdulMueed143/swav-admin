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
                <>
                    <h4>Welcome {userName}</h4>
                    <p>You have [x] appointments today</p>
                </>

            <div class="flex flex-col xl:flex-row gap-4 mt-4">
                {/* ====CONTENT==== */}
                <div class="flex flex-col gap-4 flex-auto">
                    <div class="flex flex-col gap-4">
                    <Card>
                            <CalendarView initialView="dayGrid">

                            </CalendarView>
                    </Card>
              

                    </div>
                </div>
                <div class="flex flex-col gap-4">
                    <Card>
                        <Calendar>

                        </Calendar>      
                    </Card>
                    <Card>
                        <h5>Quick Links:</h5>
                        <ul>
                            <li>
                                <ActionLink>Action 1</ActionLink>
                            </li>
                            <li>
                                <ActionLink>Action 2</ActionLink>
                            </li>
                            <li>
                                <ActionLink>Action 3</ActionLink>
                            </li>
                        </ul>
                    </Card>
                </div>
            </div>
            </Loading>
        </div>
    </>
}

export default Home
