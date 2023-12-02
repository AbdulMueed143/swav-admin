import { Loading } from 'components/shared';
import React from 'react';
import CustomAccordion from '../components/CustomAccordion';
import useBookingServices from 'utils/hooks/useBookingService'
import { useState, useEffect } from 'react';

const AvailabilitiesView = () => {
    const [loading, setLoading] = useState(false);
    const { getBarbers } = useBookingServices();
    const [barbers, setBarbers] = useState([]); // Initial state as an empty array

    // Define a function to fetch and update the services
    const fetchBarbers = async () => {
        setLoading(true);
        const data = await getBarbers();
        setBarbers(data);
        setLoading(false);
    };

    useEffect(() => {
        fetchBarbers();
    }, []); // Empty dependency array means the effect will only run once

    
    return <>

        <Loading loading={loading} >
                    <div className="flex gap-4 flex-wrap mt-4"> 
                        {barbers.map((barber, index) => (
                            <CustomAccordion barber={barber} />
                        ))}
                    </div>
                </Loading>
    </>
}

export default AvailabilitiesView