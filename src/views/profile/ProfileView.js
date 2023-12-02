import React from 'react'
import { useSelector } from 'react-redux'
import Tabs from 'components/ui/Tabs'
import { HiScissors, HiOutlineUser, HiOutlineSun } from 'react-icons/hi'
import ProfileForm from './forms/ProfileForm'
import BusinessDetailForm from './forms/BusinessDetailForm'
import HolidayGrid from './grids/HolidaysGrid'

const { TabNav, TabList, TabContent } = Tabs


const Home = () => {
    const holidays = [
        { title: 'New Year', startDate: '2023-01-01', endDate: '2023-01-01' },
        { title: 'Spring Festival', startDate: '2023-03-01', endDate: '2023-03-05' },
        // Add more holidays...
    ];


    const userName = useSelector((state) => state.auth.user.userName)
    return <>
        <div class="flex flex-col h-full">
        <div>
            <Tabs defaultValue="tab1">
                <TabList>
                    <TabNav value="tab1" icon={<HiOutlineUser />}>
                        Profile
                    </TabNav>
                    <TabNav value="tab2" icon={<HiScissors />}>
                        Business
                    </TabNav>
                    <TabNav value="tab3" icon={<HiOutlineSun />}>
                        Holidays
                    </TabNav>
                </TabList>
                <div className="p-4">
                    <TabContent value="tab1">

                       <ProfileForm />

                    </TabContent>
                    <TabContent value="tab2">
                        <div>
                            <p>
                                You have to add your gps location, so that users can find you on mobile application as nearby barber.
                            </p>
                        </div>

                        <BusinessDetailForm />

                    </TabContent>

                    <TabContent value="tab3">
                        <HolidayGrid  holidays={holidays} />
                    </TabContent>
                </div>
            </Tabs>
        </div>
        </div>
    </>
}

export default Home
