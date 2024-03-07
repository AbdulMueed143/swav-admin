import './TableWithRowSelection.css'; // Import the CSS file for styling
import moment from 'moment';
import React, { useState, useEffect } from 'react';

const EditableBookingsListView = ({selectedDate, bookingData, onBarberStatusChange}) => {
  // State to track the status of each booking
  const [bookingStatuses, setBookingStatuses] = useState({});

  // Initialize bookingStatuses when bookingData changes
  useEffect(() => {
    const initialStatuses = bookingData.reduce((acc, booking) => ({
      ...acc,
      [booking.bookingId]: booking.title,
    }), {});
    setBookingStatuses(initialStatuses);
  }, [bookingData]);

  const formatDate = (dateObject) => {
    const date = new Date(dateObject);
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options); 
  };

  const filteredBookingData = bookingData.filter(booking => 
    formatDate(booking.start) === formatDate(selectedDate)
  );

  // Function to handle status change
  const updateStatus = (id, newStatus) => {
    // Update the local state
    setBookingStatuses(prev => ({ ...prev, [id]: newStatus }));
    // Call the parent handler
    onBarberStatusChange(id, newStatus);
  };

  return (
    <div className="bookingList">
      <div className="listHeader">
        <div>Name</div>
        <div>Start Time</div>
        <div>End Time</div>
        <div>Status</div>
      </div>
      {filteredBookingData.map(row => (
        <div key={row.bookingId} className="listRow">
          <div>{row.fullName}</div>
          <div>{moment(row.start).format('h:mma')}</div>
          <div>{moment(row.end).format('h:mma')}</div>
          <div>
            <select value={bookingStatuses[row.bookingId]} onChange={(e) => updateStatus(row.bookingId, e.target.value)}>
              <option value="CONFIRMED">CONFIRMED</option>
              <option value="CANCELLED">CANCELLED</option>
            </select>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EditableBookingsListView;
