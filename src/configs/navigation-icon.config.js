import React from 'react'
import {
    HiOutlineColorSwatch,
    HiOutlineDesktopComputer,
    HiOutlineTemplate,
    HiOutlineViewGridAdd,
    HiOutlineHome,
    HiOutlineChartPie,
    HiOutlineUserAdd,
    HiScissors,
    HiGift,
    HiOutlineClock,
    HiOutlineBookOpen,
    HiCog,
    HiOutlineCheck
} from 'react-icons/hi'
import { HiCalendarDays, HiBuildingStorefront } from 'react-icons/hi2'
import { TfiDashboard } from 'react-icons/tfi'

const navigationIcon = {
    home: <HiOutlineHome />,
    singleMenu: <HiOutlineViewGridAdd />,
    collapseMenu: <HiOutlineTemplate />,
    groupSingleMenu: <HiOutlineDesktopComputer />,
    groupCollapseMenu: <HiOutlineColorSwatch />,
    dashboard: <TfiDashboard />,
    analytics: <HiOutlineChartPie />,
    calendar: <HiCalendarDays />,
    store: <HiBuildingStorefront />,
    barber: <HiOutlineUserAdd />,
    services: <HiScissors />,
    rewards: <HiGift />,
    booking: <HiOutlineBookOpen />,
    edit: <HiOutlineTemplate />,
    attendance: <HiOutlineCheck />,
    availability: <HiOutlineClock />,
    setting: <HiCog />,

}

export default navigationIcon
