import React from 'react';
import { AiOutlineDelete } from 'react-icons/ai';

const VocationCard = ({ vocation, onDelete }) => {
   
    const formatDate = (dateObject) => {
        const date = new Date(dateObject);
    
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return date.toLocaleDateString('en-US', options); 
    };
    

    return (
        <div className="holiday-card">
        
        <div className='right-column delete-icon' onClick={() => onDelete(vocation.clientSearchableId)}><AiOutlineDelete  size="1.5em" /></div>
        <h3 className="holiday-title">{vocation?.barberName}</h3>
        <p className="holiday-date">
            {vocation.startDateTime === vocation.endDateTime
                ? formatDate(vocation.startDateTime)
                : `${formatDate(vocation.startDateTime)} - ${formatDate(vocation.endDateTime)}`}
        </p>
    </div>
    );
};

export default VocationCard;

