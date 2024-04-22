import React from 'react';
import { Loading } from 'components/shared';
import { Card } from 'components/ui';
import { useState, useEffect } from 'react';
import useBookingServices from 'utils/hooks/useBookingService'
import Checkbox from 'components/ui/Checkbox'
import useAvailabilityService from 'utils/hooks/CustomServices/useAvailabilityService';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'; // Import for week and day views
import moment from 'moment';
import { idToColor, hexToRgb } from '../../utils/colorCalculator'
import Button  from 'components/ui/Buttons/Button';

//This is availability dashboard, shows availability of a barber/barbers
//You can not modify data here, its just for viewing
const DashboardView = () => {

    //Maps
    const colorMap = new Map();

    //Selected Year and Month from calendar
    const today = new Date();
    const [selectedYear, setSelectedYear] = useState(today.getFullYear());
    const [selectedMonth, setSelectedMonth] = useState(today.getMonth()+1);

    const [isFetchingData, setIsFetchingData] = useState(null);
    const [monthlyAvailability, setMonthlyAvailability] = useState([]);

    const [checkedBarbers, setCheckedBarbers] = useState([]);

    const [calendarSettings, setCalendarSettings] = useState({
        dayMaxEvents: true,
        eventMaxStack: 3,
        dayMaxEventRows: true
      });
      

      //Handle Methods

      //Whenever view changes
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
        if(selectedMonth == null && selectedYear == null) {
            //first time loading ...
            setSelectedMonth(currentDate.getMonth() + 1);
            setSelectedYear(currentDate.getFullYear());
        }
        else if(selectedMonth != currentMonth){
            setSelectedMonth(currentMonth);
            setSelectedYear(currentYear);
        }

      }

      // Making sure changes take effect when variables change 

    useEffect(() => {
        //Whenever the date changes
        fetchMonthlyAvailaibility(checkedBarbers, selectedYear, selectedMonth);
    }, [selectedMonth]);

    useEffect(() => {
        setCalendarSettings({
            dayMaxEvents: 3,
            eventMaxStack: 3,
            dayMaxEventRows: true
          });
    }, [monthlyAvailability]);


    /**
     * Basically, logic is that do we have data for the month that is visible or selectable for user
     * 
    */

    // a custom render function
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
            boxSizing: 'border-box', // Include padding in the element's total width and height
        };

        return (
            <div style={style}>
                <span style={timeStyle}><b>{timeText}</b></span>
                <span style={titleStyle}>{eventInfo.event.title}</span>
            </div>
        );
    };


    const { getBarbers  } = useBookingServices();
    const { getMonthlyAvailability } = useAvailabilityService();
    const [barbers, setBarbers] = useState([]); // Initial state as an empty array
    const [loading, setLoading] = useState(false);

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

            fetchMonthlyAvailaibility(barberIds, selectedYear, selectedMonth);
        }

        //irrelevant of anything just close the loading bar ...
        setLoading(false);
    };
    
    useEffect(() => {
        fetchBarbers();
    }, []); // Empty dependency array means the effect will only run once


    //Just fetch the data .... 
    const fetchMonthlyAvailaibility = async (barberIds, year, month) => {
        barberIds.forEach((barberId, index) => {
            const color = idToColor(barberId);
            colorMap.set(barberId, color);
        });

        setIsFetchingData(true);
        const response = await getMonthlyAvailability(barberIds, year, month);
        if(response.status == -1) {
            //show error
            console.log("Server Error");
        }
        else {
            const transformed = transformEventList(response.events);
            // const yearMonth = `${selectedYear}-${selectedMonth}`;
            // addEventToMap(yearMonth, transformed);
            setMonthlyAvailability(transformed);
        }
        setIsFetchingData(false);

    } 

    function transformEventList(events) {

        return events.map((event, index) => ({
            id: index.toString(),
            title: event.title,
            start: getDate(event.startDate.year, event.startDate.month, event.startDate.day, event.startDate.hour, event.startDate.minute),
            end: getDate(event.endDate.year, event.endDate.month, event.endDate.day, event.endDate.hour, event.endDate.minute),
            allDay: event.type  == 'HOLIDAY' ? true : false,
            eventColor : event.type  == 'HOLIDAY' ? 'red' :  colorMap.get(event.barberId),

        }));
    }


    //We have to return the timezone ... 
    function getDate(year, month, day, hour, minute, type) {
        let formattedMonth = month;
        let formattedDay = day;
        if(type == 'HOLIDAY')
            return new Date(`${year}-${formattedMonth}-${formattedDay}`);
        else {
         return new Date('YEAR-MONTH-DAYTHOUR:MINUTE:00+11:00'.replace('YEAR', year).replace('MONTH', getAsStringValue(month)).replace('DAY', getAsStringValue(day)).replace('HOUR', getAsStringValue(hour)).replace('MINUTE', getAsStringValue(minute)));
        }
    }

    function getAsStringValue(item) {
        if(item < 10) {
            return `0${item}`;
        }

        return  item;
    }

    //Filter 
    function applyFilter() {
        console.log('Checked Barbers:', checkedBarbers);
        fetchMonthlyAvailaibility(checkedBarbers, selectedYear, selectedMonth);
    }

    return <div style={{ padding : '15px', background : 'white'}}>
        <Loading loading={loading}>

        <Loading
                loading={isFetchingData}
                customLoader={
                    <div className="flex items-center justify-center p-5">
                        <div className="flex space-x-2 animate-pulse">
                            <div className="w-2 h-2 bg-green-700 rounded-full"></div>
                            <div className="w-2 h-2 bg-green-700 rounded-full"></div>
                            <div className="w-2 h-2 bg-green-700 rounded-full"></div>
                        </div>
                    </div>
                }
            >
            </Loading>

        <div>
        <div style={{ 
                marginTop: '15px', 
                marginBottom: '15px', 
                background: 'white', 
                borderRadius: '10px', 
                padding: '10px',
                display: 'flex', 
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


            <Button className="mr-2 mb-2" variant="twoTone" color="teal-900" onClick={applyFilter}>
                    Filter
            </Button>

        </div>
            

            <div>

            <FullCalendar
              showNonCurrentDates={false}
                plugins={[dayGridPlugin, timeGridPlugin]} // Include timeGridPlugin
                initialView='dayGridMonth'
                events={monthlyAvailability}
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
                    }
                  }}

                  viewDidMount={handleViewChange}
                  datesSet={handleDateChange}
            />
               
            </div>

        </div>
            
        </Loading>
    </div>
}

export default DashboardView