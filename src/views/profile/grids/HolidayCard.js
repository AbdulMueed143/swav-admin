import React from 'react';
import { AiOutlineDelete } from 'react-icons/ai';

const HolidayCard = ({ holiday, onDelete }) => {
   
    const formatDate = (dateObject) => {
        const date = new Date(dateObject);
    
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return date.toLocaleDateString('en-US', options); 
    };
    

    return (
        <div className="holiday-card">
        
        <div className='right-column delete-icon' onClick={() => onDelete(holiday.clientSearchableId)}><AiOutlineDelete  size="1.5em" /></div>
        <h3 className="holiday-title">{holiday.holidayName}</h3>
        <p className="holiday-date">
            {holiday.holidayStartDate === holiday.holidayEndDate
                ? formatDate(holiday.holidayStartDate)
                : `${formatDate(holiday.holidayStartDate)} - ${formatDate(holiday.holidayEndDate)}`}
        </p>
    </div>
    );
};

export default HolidayCard;

