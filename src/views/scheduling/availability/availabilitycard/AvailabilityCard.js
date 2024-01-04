import {  Avatar, Card } from 'components/ui'
import { useState, useEffect } from 'react';
import { FaEdit } from 'react-icons/fa';


const AvailabilityCard = ({ currentBarber, onUpdateClick }) => {


    const { barberId, firstName, lastName, email, phoneNumber, barberAvailability, about, status } = currentBarber;
    const availabilityList = document.getElementById('availabilityList');
    var formattedAvailability = null;
    // Initialize an object with all days of the week
    const [weekDays, setWeekDays] = useState({
        "MONDAY": [],
        "TUESDAY": [],
        "WEDNESDAY": [],
        "THURSDAY": [],
        "FRIDAY": [],
        "SATURDAY": [],
        "SUNDAY": []
    });

    useEffect(() => {
        console.log("use effect to calculate values ");
        computeAvailability();
    }, []); // Empty dependency array means the effect will only run once

    function computeAvailability() {
        // console.log("Barber ", firstName, lastName, barberAvailability);
        
        // Process barberAvailability
        currentBarber.barberAvailability.forEach(availability => {
            const day = availability.barberAvailabilitiesTemplate.dayOfWeek;
            const slots = availability.barberAvailabilitiesTemplate.timeSlots;

            slots.forEach(slot => {
                const startTime = `${slot.startTime.hour}:${slot.startTime.minute.toString().padStart(2, '0')}`;
                const endTime = `${slot.endTime.hour}:${slot.endTime.minute.toString().padStart(2, '0')}`;
                weekDays[day].push(`${startTime}-${endTime}`);

                const updatedWeekDays = {
                    ...weekDays,
                };
                setWeekDays(updatedWeekDays);

            });

        });


        // // console.log("Barber ", firstName, lastName, " has these availabilities ", weekDays);

        // const formattedAvailability = Object.entries(weekDays).map(([day, slots]) => {
        //     const dayName = day.charAt(0) + day.slice(1).toLowerCase();
        //     const slotString = slots.length > 0 ? slots.join(', ') : 'No Availability';
        //     return `${dayName}: ${slotString}`;
        // });

        // // console.log("formattedAvailability ", formattedAvailability);

        //         if (availabilityList) {
        //     availabilityList.innerHTML = '';
        // }

        // formattedAvailability?.forEach(item => {
        //     const listItem = document.createElement('li');
        //     listItem.textContent = item;
        //     availabilityList?.appendChild(listItem);
        // });
      
    }


    const cardHeader = (
        <div className="flex items-center justify-between" style={{ padding: '10px' }}> {/* Flexbox adjustments */}
            <div className="flex items-center">
                <Avatar
                    size={30}
                    className="mr-2"
                    shape="circle"
                    src="https://images.unsplash.com/photo-1630827020718-3433092696e7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWVucyUyMGhhaXJjdXR8ZW58MHx8MHx8fDA%3D&w=1000&q=80"
                />
                <span>
                    <h5 className="font-bold my-1" style={{ fontSize: '16px', lineHeight: '1.2' }}>
                        {firstName} {lastName}
                    </h5> 
                </span>
            </div>
            <div className="edit-icon">
                {/* Replace with your actual edit icon */}
                <FaEdit style={{ fontSize: '20px', color: 'blue' }} onClick={()=>onUpdateClick(currentBarber)} />
            </div>
        </div>
    );
    
    
    return (
        <div className="max-w-xs" style={{ width: '300px', height: '430px' }}>
            <Card
                clickable
                className="hover:shadow-lg transition duration-150 ease-in-out dark:border dark:border-gray-600 dark:border-solid"
                header={cardHeader}
                footerBorder={true}
                headerBorder={true}
            >
                <div>
                    <div>
                        {Object.entries(weekDays).map(([day, slots]) => (
                            <div key={day} className="day truncate" style={{textOverflow : 'ellipsis'}}>
                                <p>{day}:</p>
                                    {slots.length > 0 ? (
                                        slots.map((slot, index) => <p key={index} className="slot">{slot}</p>)
                                    ) : (
                                        <p className="no-availability slot">No Availability</p>
                                    )}
                            </div>
                        ))}
                    </div>
                </div>

            </Card>
        </div>
    )
}

export default AvailabilityCard
