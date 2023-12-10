import {
    NAV_ITEM_TYPE_TITLE,
    NAV_ITEM_TYPE_COLLAPSE,
    NAV_ITEM_TYPE_ITEM,
} from 'constants/navigation.constant'

const navigationConfig = [
    {
        key: 'home',
        path: '/home',
        title: 'Home',
        translateKey: 'nav.home',
        icon: 'home',
        type: NAV_ITEM_TYPE_ITEM,
        authority: [],
        subMenu: [],
    },
    {
        key: 'bookings',
        path: '/bookings',
        title: 'Bookings',
        translateKey: 'nav.bookings.bookingsviews',
        icon: 'booking',
        type: NAV_ITEM_TYPE_ITEM,
        authority: [],
        subMenu: [],
    },
    {
        key: 'Availability',
        path: '',
        title: 'Manage Availability',
        translateKey: 'nav.availability.scheduling',
        icon: 'availability',
        type: NAV_ITEM_TYPE_COLLAPSE,
        authority: [],
        subMenu: [
            {
                key: 'availability.dashboard',
                path: '/availability/dashbaord',
                title: 'Availability Calendar',
                translateKey: 'nav.availability.dashboard',
                icon: 'availability',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [],
                subMenu: [],
            },
            {
                key: 'availability.edit',
                path: '/availability',
                title: 'Update Barber Availability',
                translateKey: 'nav.availability.edit',
                icon: 'edit',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [],
                subMenu: [],
            },
           
        ],
    },
    
    {
        key: 'barbers',
        path: '/barbers',
        title: 'Barbers',
        translateKey: 'nav.barbers.barberviews',
        icon: 'barber',
        type: NAV_ITEM_TYPE_ITEM,
        authority: [],
        subMenu: [],
    },
  
    {
        key: 'rewards',
        path: '/rewards',
        title: 'Rewards',
        translateKey: 'nav.rewards.rewardsviews',
        icon: 'rewards',
        type: NAV_ITEM_TYPE_ITEM,
        authority: [],
        subMenu: [],
    },

        {
        key: 'Offerings',
        path: '',
        title: 'Offerings',
        translateKey: 'nav.offerings.offerings',
        icon: 'services',
        type: NAV_ITEM_TYPE_COLLAPSE,
        authority: [],
        subMenu: [
            {
                key: 'services',
                path: '/services',
                title: 'Services',
                translateKey: 'nav.offerings.services.ServicesViews',
                icon: '',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [],
                subMenu: [],
            },
            {
                key: 'packages',
                path: '/packages',
                title: 'Packages',
                translateKey: 'nav.offerings.packages.PackagesViews',
                icon: '',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [],
                subMenu: [],
            },
        ],
        
    },
    {
        key: 'subscriptions',
        path: '/subscriptions',
        title: 'Subscriptions',
        translateKey: 'nav.subscriptions.subscriptionsview',
        icon: 'rewards',
        type: NAV_ITEM_TYPE_ITEM,
        authority: [],
        subMenu: [],
    },

    // {
    //     key: 'profile',
    //     path: '/profile',
    //     title: 'Profile',
    //     translateKey: 'nav.profile.profileView',
    //     icon: 'profile',
    //     type: NAV_ITEM_TYPE_ITEM,
    //     authority: [],
    //     subMenu: [],
    // },

    // {
    //     key: 'analytics',
    //     path: '/analytics',
    //     title: 'Analytics & Reporting',
    //     translateKey: 'nav.analytics',
    //     icon: 'analytics',
    //     type: NAV_ITEM_TYPE_ITEM,
    //     authority: [],
    //     subMenu: [],
    // },
    // {
    //     key: 'collapseMenu',
    //     path: '',
    //     title: 'Collapse Menu',
    //     translateKey: 'nav.collapseMenu.collapseMenu',
    //     icon: 'collapseMenu',
    //     type: NAV_ITEM_TYPE_COLLAPSE,
    //     authority: [],
    //     subMenu: [
    //         {
    //             key: 'collapseMenu.item1',
    //             path: '/collapse-menu-item-view-1',
    //             title: 'Collapse menu item 1',
    //             translateKey: 'nav.collapseMenu.item1',
    //             icon: '',
    //             type: NAV_ITEM_TYPE_ITEM,
    //             authority: [],
    //             subMenu: [],
    //         },
    //         {
    //             key: 'collapseMenu.item2',
    //             path: '/collapse-menu-item-view-2',
    //             title: 'Collapse menu item 2',
    //             translateKey: 'nav.collapseMenu.item2',
    //             icon: '',
    //             type: NAV_ITEM_TYPE_ITEM,
    //             authority: [],
    //             subMenu: [],
    //         },
    //     ],
    // },
    // {
    //     key: 'groupMenu',
    //     path: '',
    //     title: 'Group Menu',
    //     translateKey: 'nav.groupMenu.groupMenu',
    //     icon: '',
    //     type: NAV_ITEM_TYPE_TITLE,
    //     authority: [],
    //     subMenu: [
    //         {
    //             key: 'groupMenu.single',
    //             path: '/group-single-menu-item-view',
    //             title: 'Group single menu item',
    //             translateKey: 'nav.groupMenu.single',
    //             icon: 'groupSingleMenu',
    //             type: NAV_ITEM_TYPE_ITEM,
    //             authority: [],
    //             subMenu: [],
    //         },
    //         {
    //             key: 'groupMenu.collapse',
    //             path: '',
    //             title: 'Group collapse menu',
    //             translateKey: 'nav.groupMenu.collapse.collapse',
    //             icon: 'groupCollapseMenu',
    //             type: NAV_ITEM_TYPE_COLLAPSE,
    //             authority: [],
    //             subMenu: [
    //                 {
    //                     key: 'groupMenu.collapse.item1',
    //                     path: '/group-collapse-menu-item-view-1',
    //                     title: 'Menu item 1',
    //                     translateKey: 'nav.groupMenu.collapse.item1',
    //                     icon: '',
    //                     type: NAV_ITEM_TYPE_ITEM,
    //                     authority: [],
    //                     subMenu: [],
    //                 },
    //                 {
    //                     key: 'groupMenu.collapse.item2',
    //                     path: '/group-collapse-menu-item-view-2',
    //                     title: 'Menu item 2',
    //                     translateKey: 'nav.groupMenu.collapse.item2',
    //                     icon: '',
    //                     type: NAV_ITEM_TYPE_ITEM,
    //                     authority: [],
    //                     subMenu: [],
    //                 },
    //             ],
    //         },
    //     ],
    // },
]

export default navigationConfig
