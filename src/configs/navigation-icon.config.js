import React from 'react'
import {
    HiOutlineColorSwatch,
    HiOutlineDesktopComputer,
    HiOutlineTemplate,
    HiOutlineViewGridAdd,
    HiOutlineHome,
    HiOutlineChartPie,
    HiOutlineUserAdd,
    HiScissors
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
    services: <HiScissors />

}

export default navigationIcon
