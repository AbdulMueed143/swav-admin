
import { useState, useEffect } from 'react';
import SubscriptionCard from './SubscriptionCard';


const SubscriptionGrid = () => {
    // Initialize state for the search input
    const [open, setOpen] = useState(false);

    const subscriptions = [
    {
        id: 'subscription1',
        title: 'Solo Barber',
        cost: '45 AUD',
        features: [
            { name: 'Add As many services as you want', included: true },
            { name: 'Create Packages', included: true },
            { name: 'Add Barbers', included: false },
            { name: 'Schedule Availablitly', included: true },
        ],
    },
    {
        id: 'subscription1',
        title: '3 or Less Barbers',
        cost: '65 AUD',
        features: [
            { name: 'Add As many services as you want', included: true },
            { name: 'Create Packages', included: true },
            { name: 'Add Upto 3 barbers', included: true },
            { name: 'Schedule Availablitly', included: true },
        ],
    },
    {
        id: 'subscription1',
        title: 'More Than 3 Barbers',
        cost: '85 AUD',
        features: [
            { name: 'Add As many services as you want', included: true },
            { name: 'Create Packages', included: true },
            { name: 'Add More than 3 barbers', included: true },
            { name: 'Schedule Availablitly', included: true },
        ],
    }

    ];
    
    // const { getBarbers, addBarbers } = useBookingServices();
    // const [barbers, setBarbers] = useState([]); // Initial state as an empty array
    // const [search, setSearch] = useState('');

    // // Define a function to fetch and update the services
    // const fetchBarbers = async () => {
    //     const data = await getBarbers();
    //     setBarbers(data);
    // };
    
    // useEffect(() => {
    //     fetchBarbers();
    // }, []); // Empty dependency array means the effect will only run once

    // const handleToClose = () => {
    //     setOpen(false);
    // };

    // Filter the services based on the search input
    // const filteredBarbers = barbers.filter(barber => 
    //     barber.firstName.toLowerCase().includes(search.toLowerCase())
    // );

    return (

        <div className="w-full"> {/* Ensures the container is full width */}
            <div className="flex gap-4 flex-wrap mt-4"> 
                <SubscriptionCard subscription={subscriptions[0]} />
                <SubscriptionCard subscription={subscriptions[1]} />
                <SubscriptionCard subscription={subscriptions[2]} />

            </div>
        </div>
    );
};

export default SubscriptionGrid;