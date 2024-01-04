import React, {useState} from 'react'
import { Loading } from 'components/shared'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'; // Import for week and day views
import moment from 'moment';


const Home = () => {
    const loading = false

    const [calendarSettings, setCalendarSettings] = useState({
        dayMaxEvents: true,
        eventMaxStack: 3,
        dayMaxEventRows: true
      });
      


    return <>
        <div class="flex flex-col h-full">

            <Loading loading={loading} >

            <FullCalendar
              showNonCurrentDates={false}
                plugins={[dayGridPlugin, timeGridPlugin]} // Include timeGridPlugin
                initialView='dayGridMonth'
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
            />
               
            </Loading>
        </div>
    </>
}

export default Home
