import React from 'react'
import { useSelector } from 'react-redux'
import Tabs from 'components/ui/Tabs'
import { HiScissors, HiOutlineUser, HiOutlineSun, HiOutlineMail, HiDeviceMobile } from 'react-icons/hi'
import WelcomeEmailTemplate from './templates/WelcomeEmailTemplate'
import BarberAddedEmailTemplate from './templates/BarberAddedEmailTemplate'

const { TabNav, TabList, TabContent } = Tabs

const EmailSettingView = () => {

    const userName = useSelector((state) => state.auth.user.userName)
    return <>
    <div class="flex flex-col h-full">
    <div>
        <Tabs defaultValue="tab1">
            <TabList>
                <TabNav value="tab1" icon={<HiOutlineMail />}>
                    Welcome
                </TabNav>
                <TabNav value="tab2" icon={<HiDeviceMobile />}>
                    Barber Added
                </TabNav>
                <TabNav value="tab3" icon={<HiDeviceMobile />}>
                    Send Bulk Email 
                </TabNav>
            </TabList>
            <div className="p-4">
                <TabContent value="tab1">
                  <div>
                    <WelcomeEmailTemplate />
                  </div>
                </TabContent>
                <TabContent value="tab2">
                    <div>
                      <BarberAddedEmailTemplate />
                    </div>
                </TabContent>
                <TabContent value="tab3">
                    <div>

                      Comming Soon!
                    </div>
                </TabContent>
            </div>
        </Tabs>
    </div>
    </div>
</>
}

export default EmailSettingView
