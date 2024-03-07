import React, { useState } from 'react';
import moment from 'moment';
import './css/TableWithRowSelection.css';
import { Dialog, Button } from 'components/ui'

const AttendanceBookingsListView = ({ selectedDate, bookingData, onMarkBookingsCompleted }) => {
    // State to keep track of selected bookings
    const [selectedBookings, setSelectedBookings] = useState([]);

    // Toggle individual booking selection
    const toggleBookingSelection = (booking) => {
      setSelectedBookings(prev => {
          const found = prev.find(item => item.bookingId === booking.id);
          if (found) {
              return prev.filter(item => item.bookingId !== booking.id);
          } else {
              return [...prev, { bookingId: booking.id, status: "COMPLETED" }];
          }
      });
  };

  const toggleSelectAll = (e) => {
    if (e.target.checked) {
        setSelectedBookings(bookingData.map(booking => ({ bookingId: booking.id, status: "COMPLETED" })));
    } else {
        setSelectedBookings([]);
    }
};
    // Check if all bookings are selected
    const allSelected = bookingData.length > 0 && selectedBookings.length === bookingData.length;

    // Mark selected bookings as completed
    const markSelectedAsCompleted = () => {
      onMarkBookingsCompleted(selectedBookings);
    };

    return (
        <div className="bookingList">
            <div className="listHeader">
                <div><input type="checkbox" onChange={toggleSelectAll} checked={allSelected} /></div>
                <div>Name</div>
                <div>Start Time</div>
                <div>End Time</div>
                <div>Status</div>
            </div>
            {bookingData.map(row => (
                <div key={row.id} className="listRow">
                  <div>
                      <input 
                          type="checkbox"
                          checked={selectedBookings.some(item => item.bookingId === row.id)}
                          onChange={() => toggleBookingSelection(row)}
                      />
                  </div>
                    <div>{row?.user?.firstName} {row?.user?.lastName}</div>
                    <div>{moment(row.startTime).format('h:mma')}</div>
                    <div>{moment(row.endTime).format('h:mma')}</div>
                    <div>{row.bookingStatus}</div>
                </div>
            ))}

            <div style={{paddingTop : '10px'}}>
              <Button size="xs" onClick={markSelectedAsCompleted}>
                Mark Selected as Completed
              </Button>
            </div>

        </div>
    );
};

export default AttendanceBookingsListView;
