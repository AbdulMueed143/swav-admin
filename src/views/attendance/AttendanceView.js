import React, {useState, useEffect, useMemo } from 'react'
import { Loading } from 'components/shared'
import moment from 'moment';
import './css/attendance.css'
import { Calendar, Card, Badge } from 'components/ui'
import useBookingServices from 'utils/hooks/useBookingService'
import AttendanceBookingsListView from './AttendanceBookingsListView';


const Home = () => {

    const { fetchBookingAvailabilityForRange, fetchBookingsForDate, updateBarberBookings } = useBookingServices();

    const [value, setValue] = useState(new Date());
    const [loading, setLoading] = useState(false);
    const [today, setToday] = useState(new Date());
    const [bookings, setBookings] = useState([]);
    const [bookingAvailabilityStatus, setBookingAvailabilityStatus] = useState([]);

    const handleOnMarkBookingsCompleted = async (bookingsCompleted) => {
        //now se send the request to mark bookings as completed
        const response = await updateBarberBookings(bookingsCompleted);

        if(response.status == -1) {
            //failed 
        }
        else {
            //otherwise
            //reload
            await fetchBookingsForDatefun();
        }
    }

    const formatDateToString = (date) => {
        return date.toISOString().split('T')[0]; // Converts date to 'yyyy-mm-dd' format
    };
    
    const isDateAvailable = (date) => {
        const dateString = formatDate(date);
        const status = bookingAvailabilityStatus.find(item => item.bookingDate === dateString);
        return status ? status.hasBookings : false;
    };

    const formatDate = (date) => {
        const d = new Date(date);
        let month = '' + (d.getMonth() + 1 );
        let day = '' + d.getDate();
        const year = d.getFullYear();
    
        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;
    
        return year + '-'+month + '-'+day;
    };

    const handleDateClick = (value, event) => {
        setValue(value);
    };

    const handleActiveStartDateChange = async(event) => {
        // Handle view change (e.g., month change)

        const { firstDayOfMonth, lastDayOfMonth } = getFirstAndLastDayOfMonth(event);
        await fetchBookingAvailabilities(firstDayOfMonth, lastDayOfMonth);
    };


    useEffect(() => {
        //whenever you change the date on calendar
        const fetchData = async () => {
            await fetchBookingsForDatefun();
        };

        fetchData();
    }, [value]);

    useEffect(() => {
        const fetchData = async () => {
            const { firstDayOfMonth, lastDayOfMonth } = getFirstAndLastDayOfMonth(value);
            await fetchBookingAvailabilities(firstDayOfMonth, lastDayOfMonth);
        };

        fetchData();
    }, []);

    const fetchBookingAvailabilities = async(fromDate, toDate) => {
        try {
            setLoading(true);
            const response = await fetchBookingAvailabilityForRange(formatDate(fromDate), formatDate(toDate));

            if(response.status == -1) {
                //failed
            }
            else {
                setBookingAvailabilityStatus(response.data)
            }

            // Update state with the fetched data, if needed
        } catch (error) {
            console.error('Failed to fetch data:', error);
        } finally {
            setLoading(false);
        }
    }

    function getFirstAndLastDayOfMonth(date) {
        const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDayOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        
        return { firstDayOfMonth, lastDayOfMonth };
    }

    const fetchBookingsForDatefun = async() => {
        try {
            setLoading(true);
            const response = await fetchBookingsForDate(formatDate(value));

            if(response.status == -1) {
                //failed
            }
            else {
                console.log("Bookigns we set ",response.data);
                setBookings(response.data);
            }

            // Update state with the fetched data, if needed
        } catch (error) {
            console.error('Failed to fetch data:', error);
        } finally {
            setLoading(false);
        }
    }

    return <>
       <div class="container">


        <div class="left" style={{padding: '10px', background: "white", borderRadius: "20px"}}>

        <div className="md:w-[260px] max-w-[260px] mx-auto">
            <Calendar
                style={{backgroundColor: 'white', padding: '0px'}}
                onChange={handleDateClick}
                onMonthChange={handleActiveStartDateChange}
                value={value}
                dayClassName={(date) => {
                    if (isDateAvailable(date)) {
                        return 'text-red-600'; // Date is available, apply red color
                    }
                    return 'text-gray-700 dark:text-gray-200'; // Default text color
                }}
                renderDay={(date) => {
                    const day = date.getDate();
                    if (isDateAvailable(date)) {
                        return (
                            <span className="relative flex justify-center items-center w-full h-full text-red-600">
                                {day}
                                <Badge
                                    className="absolute bottom-1"
                                    innerClass="h-1 w-1 bg-red-600"
                                />
                            </span>
                        );
                    }
                    return <span>{day}</span>;
                }}
            />
        </div>
        
        
        </div>

            <div class="right" style={{padding: '20px',  borderRadius: "20px"}}>

                <Loading loading={loading} > 
                    {(bookings.length > 0) ? (
                        <AttendanceBookingsListView selectedDate={value} bookingData={bookings} onMarkBookingsCompleted={handleOnMarkBookingsCompleted} />
                    ) :  (
                        <div>No bookings on {formatDate(value)} that are in confirmed state.</div>
                    )}
                </Loading>
                
            </div>
        </div>
    </>
}

export default Home
