import { useState, useEffect } from 'react';
import React from 'react'
import useBookingServices from 'utils/hooks/useBookingService'
import { Loading } from 'components/shared';
import Button  from 'components/ui/Buttons/Button';
import { Dialog } from 'components/ui';
import AvailabilityCard from './AvailabilityCard';
import useAvailabilityService from 'utils/hooks/CustomServices/useAvailabilityService';
import UpdateAvailabilityModalParent from '../modals/UpdateAvailabilityModalParent';


const AvailabilityGrid = () => {
    // Initialize state for the search input
    const [loading, setLoading] = useState(false);

    const { getBarbers, addBarbers, disableBarber } = useBookingServices();
    const [barbers, setBarbers] = useState([]); // Initial state as an empty array
    const [search, setSearch] = useState('');
    const [updateCounter, setUpdateCounter] = useState(0); // Added to force re-render

    const { getBarbersWithAvailability, updateBarberAvailability  } = useAvailabilityService();

    const fetchBarbers = async () => {
        if(loading)
            return;

        setLoading(true);
        const barbersWithAvailability = await getBarbersWithAvailability();

        setBarbers(barbersWithAvailability);
        console.log(barbers);

        console.log("barbersWithAvailability ", barbersWithAvailability);
        setLoading(false);
    };

    useEffect(() => {
        fetchBarbers();
    }, []); // Empty dependency array means the effect will only run once


    //Handling Update Model
    const [selectedUpdatableBarber, setSelectedUpdatableBarber] = useState(null);
    const [openUpdateModal, setIsUpdateModalOpen] = useState(false);
    const handleClickToOpenUpdateModal = (updateBarber) => {
        setSelectedUpdatableBarber(updateBarber);
        setIsUpdateModalOpen(true);
    };

    const handleClickToCloseUpdateModal = () => {
        setIsUpdateModalOpen(false);
        setSelectedUpdatableBarber(null);
    };


    const handleClickToSaveUpdateModal = async ()  => {
        // Handle the form submission here using formValues
        setIsUpdateModalOpen(false);
        setSelectedUpdatableBarber(null);

        await fetchBarbers();
        setUpdateCounter(prev => prev + 1); // Increment counter to force re-render

    }

    return (
        <div className="w-full"> {/* Ensures the container is full width */}
        <div className="flex justify-end gap-4 items-center">
            <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="ss"
                className="p-2 border rounded flex-grow"
                />
            
            </div>

            <Loading loading={loading} >
                <div className="flex gap-4 flex-wrap mt-4"> 
                    {barbers.map((barber, index) => (
                        <AvailabilityCard key={barber.barberId} currentBarber={barber} onUpdateClick={handleClickToOpenUpdateModal} />
                    ))}
                </div>
            </Loading>

            <UpdateAvailabilityModalParent updateBarber={selectedUpdatableBarber} open={openUpdateModal} handleClose={handleClickToCloseUpdateModal} handleUpdate={handleClickToSaveUpdateModal}  />

        </div>
    );
};

export default AvailabilityGrid;