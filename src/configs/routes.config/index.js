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
        component: React.lazy(() => import('views/calendar/availability/updatedAvailabilityView')),
        authority: [],
    },
    {
        key: 'calendar.availability',
        path: '/availability/edit/:barberId',
        component: React.lazy(() => import('views/calendar/availability/editBarberAvailability')),
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
    {
        key: 'barbers',
        path: '/barbers',
        component: React.lazy(() => import('views/barberviews/barbers/BarbersViews')),
        authority: [],
    },
    {
        key: 'services',
        path: '/services',
        component: React.lazy(() => import('views/offerings/services/ServicesViews')),
        authority: [],
    },
    {
        key: 'packages',
        path: '/packages',
        component: React.lazy(() => import('views/offerings/packages/PackagesView')),
        authority: [],
    },
    {
        key: 'rewards',
        path: '/rewards',
        component: React.lazy(() => import('views/rewards/RewardsView')),
        authority: [],
    },
    {
        key: 'subscriptions',
        path: '/subscriptions',
        component: React.lazy(() => import('views/subscriptions/SubscriptionsView')),
        authority: [],
    },
]