import React, {useState, useEffect} from 'react'
import { Loading } from 'components/shared'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'; // Import for week and day views
import moment from 'moment';
import useBookingServices from 'utils/hooks/useBookingService';
import Checkbox from 'components/ui/Checkbox';
import { idToColor, hexToRgb } from '../utils/colorCalculator'
import Button  from 'components/ui/Buttons/Button';
import { hide } from '@popperjs/core';


const Home = () => {

    //Selected Year and Month from calendar
    const today = new Date();
    const colorMap = new Map();

    const { fetchBookings } = useBookingServices();

    const [currentStartDate, setCurrentStartDate] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
    const [currentEndDate, setCurrentEndDate] = useState(new Date(today.getFullYear(), today.getMonth() + 1, 0));


    const [loading, setLoading] = useState(false);

    const [isFetchingData, setIsFetchingData] = useState(null);
    const [monthlyBookings, setMonthlyBookings] = useState([]);
    const [checkedBarbers, setCheckedBarbers] = useState([]);

    const [calendarSettings, setCalendarSettings] = useState({
        dayMaxEvents: true,
        eventMaxStack: 3,
        dayMaxEventRows: true
    });

    //Handle View Change
    function handleViewChange(viewInfo) {
        if (viewInfo.view.type === 'dayGridMonth') {
          // Update settings for the month view
          setCalendarSettings({
            dayMaxEvents: true,
            eventMaxStack: 3,
            dayMaxEventRows: true
          });
        } 
      }

      function formatDateToYYYYMMDD(date) {
        const year = date.getFullYear();
        // getMonth() returns month from 0-11; add 1 to make it 1-12
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Pad single digit months with a leading zero
        const day = date.getDate().toString().padStart(2, '0'); // Pad single digit days with a leading zero
        return `${year}-${month}-${day}`;
    }
    //Whenever next is pressed or previous 
    function handleDateChange(arg) {

        if (arg.view.type === 'dayGridMonth') {
            setCalendarSettings({
            dayMaxEvents: 3,
            eventMaxStack: 3,
            dayMaxEventRows: true
            });
        } 

        //Get current Date
        const currentDate = arg.start;
        currentDate.setMonth(currentDate.getMonth()); // Add one month, now we are at current month

        //current month will always be +1
        const currentMonth = currentDate.getMonth() + 1;
        const currentYear = currentDate.getFullYear();

        //first time set current date ...
        // if(selectedMonth == null && selectedYear == null) {
            //first time loading ...
            setCurrentStartDate(new Date(today.getFullYear(), today.getMonth(), 1));
            setCurrentEndDate(new Date(today.getFullYear(), today.getMonth() + 1, 0));
        // }
        // else if(selectedMonth != currentMonth){
        //     // setSelectedMonth(currentMonth);
        //     // setSelectedYear(currentYear);

        //     setCurrentStartDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), 1));
        //     setCurrentEndDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0));
        // }
    }

    const renderEventContent = (eventInfo) => {

        // Format start and end times
        const startTime = moment(eventInfo.event.start).format('h:mma'); // "1:00am"
        const endTime = eventInfo.event.end ? moment(eventInfo.event.end).format('h:mma') : ''; // "2:00pm"
        const startDate = moment(eventInfo.event.start).format('MMM DD, YYYY'); // "Dec 04, 2023"
    
        const timeText = endTime ? `${startTime} - ${endTime}` : `${startDate} at ${startTime}`;
    
        const timeStyle = {
            display: 'block', // Makes the time text a block-level element
            // Additional styles for the time text, if needed
            };
    
            const titleStyle = {
                display: 'block', // Makes the title text a block-level element
                fontStyle: 'italic', // To maintain the italic style since <i> is replaced
                // Additional styles for the title, if needed
            };
    
            const style = {
                backgroundColor: eventInfo.event.extendedProps.eventColor,
                color: 'white', // Set text color (optional)
                borderRadius: '4px', // Custom styling (optional)
                padding: '4px', // Custom styling (optional)
                width: '100%', // Ensure it covers the full width
                height: '100%',
                minHeight: '65px',
                boxSizing: 'border-box', // Include padding in the element's total width and height
            };
    
            return (
                <div style={style}>
                    <span style={timeStyle}><b>{timeText}</b></span>
                    <span style={titleStyle}>{eventInfo.event.title}</span>
                    <span style={titleStyle}>{eventInfo.event.extendedProps.fullName}</span>
                </div>
            );
    };

    //Get the bookings
    //Bookings for range of dates ...
    //also barberId or Id's
    // ================================================================= fetch data =========================================================
    const fetchBookingsForMonth = async (barberIds, year, month) => {
        barberIds.forEach((barberId, index) => {
            const color = idToColor(barberId);
            colorMap.set(barberId, color);
        });

        setIsFetchingData(true);
        const response =  await fetchBookings(barberIds, formatDateToYYYYMMDD(currentStartDate), formatDateToYYYYMMDD(currentEndDate));

        if(response.status == -1) {
            //show error ...
        }
        else {
            //save the barbers in variable ...
            const barberIds = response.data.map(booking => booking.barberId);
            // setBarbers(response);
            setCheckedBarbers(barberIds);

            // console.log("Current Start Date ", currentStartDate);
            // console.log("Current End Date ", currentEndDate);
            const transformed = transformBookingsToCalendarEvents(response.data);
            // const yearMonth = `${selectedYear}-${selectedMonth}`;
            // addEventToMap(yearMonth, transformed);
            // setMonthlyAvailability(transformed);
            setMonthlyBookings(transformed);
            console.log("Response ", transformed);

        }

        setIsFetchingData(false);

    }

    function transformBookingsToCalendarEvents(bookings) {

        return bookings.map((booking, index) => ({
            id: index.toString(),
            title: booking.bookingStatus,
            start: booking.startTime,
            end: booking.endTime,
            fullName: booking.barber.firstName + " " + booking.barber.lastName,
            // start: getDate(booking.startTime.year, booking.startTime.month, booking.startTime.day, booking.startTime.hour, booking.startTime.minute),
            // end: getDate(booking.endTime.year, booking.endTime.month, booking.endTime.day, booking.endTime.hour, booking.endTime.minute),
            allDay: false,
            eventColor : colorMap.get(booking.barberId),
        }));
    }

    //We have to return the timezone ... 
    function getDate(year, month, day, hour, minute) {
        return new Date('YEAR-MONTH-DAYTHOUR:MINUTE:00+11:00'.replace('YEAR', year).replace('MONTH', getAsStringValue(month)).replace('DAY', getAsStringValue(day)).replace('HOUR', getAsStringValue(hour)).replace('MINUTE', getAsStringValue(minute)));
    }
    function getAsStringValue(item) {
        if(item < 10) {
            return `0${item}`;
        }

        return  item;
    }

    const { getBarbers  } = useBookingServices();
    const [barbers, setBarbers] = useState([]); // Initial state as an empty array
    
    function applyFilter() {
        console.log('Checked Barbers:', checkedBarbers);
        // fetchMonthlyAvailaibility(checkedBarbers, selectedYear, selectedMonth);
    }

    const fetchBarbers = async () => {
        setLoading(true);
        //get all the barbers from get barber api
        const response = await getBarbers();

        if(response.status == -1) {
            //show error ...
        }
        else {
            //save the barbers in variable ...
            const barberIds = response.map(barber => barber.barberId);
            setBarbers(response);
            setCheckedBarbers(barberIds);
            
            //from and to date
            fetchBookingsForMonth(barberIds, currentStartDate, currentEndDate);
        }

        //irrelevant of anything just close the loading bar ...
        setLoading(false);
    };
    
    useEffect(() => {
        fetchBarbers();
    }, []); // Empty dependency array means the effect will only run once

    //============================================================================================================

    return <>
        <div class="flex flex-col h-full">

            <Loading loading={loading} >

            <Loading
                loading={isFetchingData}
                customLoader={
                    <div className="flex items-center justify-center p-5">
                        <div className="flex space-x-2 animate-pulse">
                            <div className="w-2 h-2 bg-indigo-600 rounded-full"></div>
                            <div className="w-2 h-2 bg-indigo-600 rounded-full"></div>
                            <div className="w-2 h-2 bg-indigo-600 rounded-full"></div>
                        </div>
                    </div>
                }
            >
            </Loading>

        <div style={{ 
                marginTop: '15px', 
                marginBottom: '15px', 
                background: 'white', 
                borderRadius: '10px', 
                padding: '10px',
                display: 'flex', 
                overflow: 'hidden',
                justifyContent: 'space-between', // This spreads out the children
                alignItems: 'center' // This centers them vertically
            }}>   
            <Checkbox.Group value={checkedBarbers} onChange={setCheckedBarbers}>
                {barbers.map((barber, index) => (
                    <Checkbox
                        key={barber.barberId}
                        style={{ backgroundColor: colorMap.get(barber.barberId) }}
                        value={barber.barberId}
                        checked='checked'
                    >
                    <p style={{ backgroundColor: colorMap.get(barber.barberId) }}>{barber.firstName} {barber.lastName}</p>
                    </Checkbox>
                ))}
            </Checkbox.Group>


            <Button className="mr-2 mb-2" variant="twoTone" color="green-900" onClick={applyFilter}>
                    Filter
            </Button>

        </div>



            <FullCalendar
              showNonCurrentDates={false}
                plugins={[dayGridPlugin, timeGridPlugin]} // Include timeGridPlugin
                initialView='dayGridMonth'
                events={monthlyBookings}
                eventContent={renderEventContent}
                headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek,timeGridDay' // Add buttons for week and day views
                }}
                displayEventTime
                eventTimeFormat={{ 
                    hour: '2-digit',
                    minute: '2-digit',
                    meridiem: false,
                }}
                views={{
                    month: { ...calendarSettings },
                    dayMaxEvents: 3,
                    eventMaxStack: 3,
                    dayMaxEventRows: true, // or set a specific number
                    timeGrid: {
                        dayMaxEventRows: 2 // adjust to 6 only for timeGridWeek/timeGridDay
                    },
                    week: {
                        slotDuration: '00:05:00', // Adjust as needed
                        slotLabelInterval: '00:30' // Makes labels match the duration for clarity
                    },
                    day: {
                        slotDuration: '00:05:00', // Adjust as needed
                        slotLabelInterval: '00:30' // Makes labels match the duration for clarity
                    }
                  }}


                  viewDidMount={handleViewChange}
                  datesSet={handleDateChange}
            />
               
            </Loading>
        </div>
    </>
}

export default Home
