import React from 'react'
import authRoute from './authRoute'

export const publicRoutes = [...authRoute]

export const protectedRoutes = [
    //Path to home 
    {
        key: 'home',
        path: '/home',
        component: React.lazy(() => import('views/home/Home')),
        authority: [],
    },

    {
        key: 'bookings',
        path: '/bookings',
        component: React.lazy(() => import('views/bookings/BookingView')),
        authority: [],
    },

    {
        key: 'availability.dashboard',
        path: '/availability/dashbaord',
        component: React.lazy(() => import('views/scheduling/dashboard/DashboardView')),
        authority: [],
    },
   
    {
        key: 'availability.edit',
        path: '/availability',
        component: React.lazy(() => import('views/scheduling/availability/updatedAvailabilityView')),
        authority: [],
    },

    // ====
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

    //Services and PAckages
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

    //Rewards Screen
    {
        key: 'rewards',
        path: '/rewards',
        component: React.lazy(() => import('views/rewards/RewardsView')),
        authority: [],
    },

    // Subscriotion screen
    {
        key: 'subscriptions',
        path: '/subscriptions',
        component: React.lazy(() => import('views/subscriptions/SubscriptionsView')),
        authority: [],
    },

    //Profile setting path
    {
        key: 'profile',
        path: '/profile',
        component: React.lazy(() => import('views/profile/ProfileView')),
        authority: [],
    },
]