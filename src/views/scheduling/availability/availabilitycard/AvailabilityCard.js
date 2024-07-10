import {  Avatar, Card } from 'components/ui'
import { useState, useEffect } from 'react';
import { FaEdit } from 'react-icons/fa';

const AvailabilityCard = ({ currentBarber, onUpdateClick }) => {

    console.log("Rendering Information ", currentBarber);

    const INITIAL_WEEK_DAYS = {
        "MONDAY": [],
        "TUESDAY": [],
        "WEDNESDAY": [],
        "THURSDAY": [],
        "FRIDAY": [],
        "SATURDAY": [],
        "SUNDAY": []
    };

    const { barberId, firstName, lastName, email, phoneNumber, barberAvailability, about, status } = currentBarber;
    const [weekDays, setWeekDays] = useState(INITIAL_WEEK_DAYS);

    const updateWeekDays = (newDay, newSlots) => {
        setWeekDays(prevWeekDays => ({
          ...prevWeekDays,
          [newDay]: newSlots
        }));
      };


    useEffect(() => {
        computeAvailability();
    }, [currentBarber]);

    function computeAvailability() {

        console.log("Computing Availability Again ", currentBarber);

        setWeekDays(INITIAL_WEEK_DAYS);
        const newWeekDaysState = INITIAL_WEEK_DAYS;

        //Only availabilities that have day of the week 
        const withDayOfWeek = currentBarber?.barberAvailability?.filter(item => item?.barberAvailabilitiesTemplate?.hasOwnProperty('dayOfWeek'));

        withDayOfWeek?.forEach(availability => {
            const day = availability.barberAvailabilitiesTemplate?.dayOfWeek;
            const slots = availability.barberAvailabilitiesTemplate?.timeSlots;

            slots?.forEach(slot => {
                //TODO: I am adding this hack we need to check this letter on
                //Problem, the slots are being repeated, happens because events are fired multiple times, was unable to figure this out right now
                
                if(!newWeekDaysState[day].includes(slotToString(slot)))
                    newWeekDaysState[day].push(slotToString(slot));
            });
        });

        console.log("newWeekDaysState ", newWeekDaysState);
        
        setWeekDays(newWeekDaysState);
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
                                <p>{day}: </p>
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