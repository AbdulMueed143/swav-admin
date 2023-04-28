import React from 'react'
import authRoute from './authRoute'

export const publicRoutes = [...authRoute]

export const protectedRoutes = [
    {
        key: 'home',
        path: '/home',
        component: React.lazy(() => import('views/home/Home')),
        authority: [],
    },
    {
        key: 'calendar.dashboard',
        path: '/calendar',
        component: React.lazy(() => import('views/calendar/dashboard/DashboardView')),
        authority: [],
    },
    {
        key: 'calendar.availability',
        path: '/availability',
        component: React.lazy(() => import('views/calendar/availability/AvailabilityView')),
        authority: [],
    },
    {
        key: 'calendar.scheduling',
        path: '/scheduling',
        component: React.lazy(() => import('views/calendar/scheduling/SchedulingView')),
        authority: [],
    },
    {
        key: 'store',
        path: '/store',
        component: React.lazy(() => import('views/store/StoreView')),
        authority: [],
    },
    {
        key: 'analytics',
        path: '/analytics',
        component: React.lazy(() => import('views/analytics/Analytics')),
        authority: [],
    },
]