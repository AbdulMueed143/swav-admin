import React from 'react'
import { useSelector } from 'react-redux'
import Tabs from 'components/ui/Tabs'
import { HiScissors, HiOutlineUser, HiOutlineSun, HiOutlineMail, HiDeviceMobile } from 'react-icons/hi'
import EmailSettingView from './email/EmailSettingView'

const { TabNav, TabList, TabContent } = Tabs

const Home = () => {

    const userName = useSelector((state) => state.auth.user.userName)
    return <>
        <div class="flex flex-col h-full">
        <div>
            <Tabs defaultValue="tab1">
                <TabList>
                    <TabNav value="tab1" icon={<HiOutlineMail />}>
                        Email Setting
                    </TabNav>
                </TabList>
                <div className="p-4">
                    <TabContent value="tab1">
                        <EmailSettingView />
                    </TabContent>
                </div>
            </Tabs>
        </div>
        </div>
    </>
}

export default Home
