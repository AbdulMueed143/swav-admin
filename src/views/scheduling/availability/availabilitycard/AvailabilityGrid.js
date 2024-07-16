import { useState, useEffect, useCallback } from 'react';
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

    const barbersWithAvailability = barbers;

    const { getBarbersWithAvailability, updateBarberAvailability  } = useAvailabilityService();

    async function fetchBarbers()  {

        setLoading(true);
        setBarbers([]);

        const barbersWithAvailability = await getBarbersWithAvailability();

        setBarbers(barbersWithAvailability);

        setLoading(false);
    };


        //===============
        const INITIAL_WEEK_DAYS = {
            "MONDAY": [],
            "TUESDAY": [],
            "WEDNESDAY": [],
            "THURSDAY": [],
            "FRIDAY": [],
            "SATURDAY": [],
            "SUNDAY": []
        };
    
        function computeAvailability(availabilities) {
            const newWeekDaysState = JSON.parse(JSON.stringify(INITIAL_WEEK_DAYS));;
            const withDayOfWeek = availabilities?.filter(item => item?.barberAvailabilitiesTemplate?.hasOwnProperty('dayOfWeek'));

            withDayOfWeek?.forEach(availability => {
                const day = availability.barberAvailabilitiesTemplate?.dayOfWeek;
                const slots = availability.barberAvailabilitiesTemplate?.timeSlots;
    
                slots?.forEach(slot => {
                        newWeekDaysState[day].push(slotToString(slot));
                });
            });
    
            return newWeekDaysState;
        }
    

        function slotToString(slot) {
            var startTimeHour = slot.startTime.hour % 12;
            var endTimeHour = slot.endTime.hour % 12;
        
            // Convert 0 hour to 12 (for 12 AM and 12 PM)
            startTimeHour = startTimeHour ? startTimeHour : 12;
            endTimeHour = endTimeHour ? endTimeHour : 12;
        
            var startTimeAmPM = slot.startTime.hour >= 12 ? "pm" : "am";
            var endTimeAmPM = slot.endTime.hour >= 12 ? "pm" : "am";
        
            var startTimeMinute = slot.startTime.minute < 10 ? `0${slot.startTime.minute}` : slot.startTime.minute;
            var endTimeMinute = slot.endTime.minute < 10 ? `0${slot.endTime.minute}` : slot.endTime.minute;
        
            return `${startTimeHour}:${startTimeMinute}${startTimeAmPM} - ${endTimeHour}:${endTimeMinute}${endTimeAmPM}`;
        }
        /// ====================================
    
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
    }

    return (
        <div className="w-full"> {/* Ensures the container is full width */}
        <div className="flex justify-end gap-4 items-center">
            <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search for Barber"
                className="p-2 border rounded flex-grow"
                />
            
            </div>

            <Loading loading={loading} >
                <div className="flex gap-4 flex-wrap mt-4"> 
                    {barbersWithAvailability.map((barber, index) => (
                        <AvailabilityCard currentBarber={barber} weekDays={computeAvailability(barber.barberAvailability)} onUpdateClick={handleClickToOpenUpdateModal} />
                    ))}
                </div>
            </Loading>

            <UpdateAvailabilityModalParent updateBarber={selectedUpdatableBarber} open={openUpdateModal} handleClose={handleClickToCloseUpdateModal} handleUpdate={handleClickToSaveUpdateModal}  />

        </div>
    );
};

export default AvailabilityGrid;