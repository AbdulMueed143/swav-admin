import React from 'react';
import { CalendarView, Loading } from 'components/shared';
import { Card } from 'components/ui';
import { useState, useEffect } from 'react';
import useBookingServices from 'utils/hooks/useBookingService'
import Checkbox from 'components/ui/Checkbox'


//This is availability dashboard, shows availability of a barber/barbers
//You can not modify data here, its just for viewing
const DashboardView = () => {
    const { getBarbers  } = useBookingServices();
    const [barbers, setBarbers] = useState([]); // Initial state as an empty array
    const [loading, setLoading] = useState(false);

    const fetchBarbers = async () => {
        setLoading(true);
        const data = await getBarbers();
        const colors = generateColorClasses(data.length);
        // Assign a color to each barber
        data.forEach((barber, index) => {
            barber.color = colors[index];
        });
        setBarbers(data);
        setLoading(false);
    };
    
    useEffect(() => {
        fetchBarbers();
    }, []); // Empty dependency array means the effect will only run once

    //dw
    function getDate(dayString: string) {
        const today = new Date()
        const year = today.getFullYear().toString()
        let month = (today.getMonth() + 1).toString()

        if (month.length === 1) {
            month = '0' + month
        }

        return dayString.replace('YEAR', year).replace('MONTH', month)
    }

    //We need to get different events to show in this view ... 
    //We need all the bookings, filtered with selected barbers ...
    //We need all the holidays, public holidays
    //We need holiday if someone is not working
    const eventsData = [
        {
            id: '0',
            title: 'All Day Event',
            start: getDate('YEAR-MONTH-01'),
            eventColor: 'orange',
        },
        {
            id: '1',
            title: 'Long Event',
            start: getDate('YEAR-MONTH-07'),
            end: getDate('YEAR-MONTH-10'),
            eventColor: 'red',
        },
        {
            id: '2',
            groupId: '999',
            title: 'Repeating Event',
            start: getDate('YEAR-MONTH-09T16:00:00+00:00'),
            eventColor: 'blue',
        },
        {
            id: '3',
            groupId: '999',
            title: 'Repeating Event',
            start: getDate('YEAR-MONTH-16T16:00:00+00:00'),
            eventColor: 'blue',
        },
        {
            id: '4',
            title: 'Birthday Party',
            start: getDate('YEAR-MONTH-19T07:00:00+00:00'),
            eventColor: 'purple',
        },
        {
            id: '5',
            title: 'Meeting',
            start: getDate('YEAR-MONTH-18T14:30:00+00:00'),
            eventColor: 'blue',
        },
        {
            id: '6',
            title: 'Dinner',
            start: getDate('YEAR-MONTH-18T20:00:00+00:00'),
            eventColor: 'emerald',
        },
    ];

    //TOOD - ReWrite it somehow, it will fail if there are more than 15 barbers
    const baseColors = ['blue', 'red', 'green', 'yellow', 'purple'];
    const intensities = ['600',  '400',  '200'];
    const generateColorClasses = (n) => {
        const colorClasses = [];
        let count = 0;
    
        while (count < n) {
            for (let i = 0; i < baseColors.length && count < n; i++) {
                for (let j = 0; j < intensities.length && count < n; j++) {
                    colorClasses.push(`${baseColors[i]}-${intensities[j]}`);
                    count++;
                }
            }
        }
    
        return colorClasses;
    };
    


    return <>
        <Loading loading={loading}>

        <div>
            <div style={ {marginTop : '15px', marginBottom : '15px', background : 'white', borderRadius : '10px', padding : '10px' }}>
                
                <Checkbox.Group color="yellow-500" >
                {barbers.map((barber, index) => (
                    <Checkbox key={index} color={barber.color} value={barber.barberId}>
                        {barber.firstName} {barber.lastName}
                    </Checkbox>
                ))}
            </Checkbox.Group>
            </div>

            <div>
                <CalendarView
                    editable
                    selectable
                    events={eventsData}
                    eventClick={(arg) => {
                        console.log('onEventClick', arg)
                    }}
                    select={(event) => {
                        console.log('onCellSelect', event)
                    }}
                    eventDrop={(arg) => {
                        console.log('onEventChange', arg)
                    }}
                />
            </div>

        </div>
            
        </Loading>
    </>
}

export default DashboardView