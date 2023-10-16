import React, { useState, useEffect } from 'react'
import classNames from 'classnames'
import { Badge } from 'components/ui'
// import FullCalendar from '@fullcalendar/react'
// import dayGridPlugin from '@fullcalendar/daygrid'
// import timeGridPlugin from '@fullcalendar/timegrid'
// import interactionPlugin from '@fullcalendar/interaction'

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
// import '@fullcalendar/common/main.css'
// import '@fullcalendar/daygrid/main.css'
// import '@fullcalendar/timegrid/main.css'

// import '@fullcalendar/core/locales/';
// import '@fullcalendar/daygrid/main.css';
// import '@fullcalendar/timegrid/main.css';

export const eventColors = {
    red: {
        bg: 'bg-red-50 dark:bg-red-500/10',
        text: 'text-red-500 dark:text-red-100',
        dot: 'bg-red-500',
    },
    orange: {
        bg: 'bg-orange-50 dark:bg-orange-500/10',
        text: 'text-orange-500 dark:text-orange-100',
        dot: 'bg-orange-500',
    },
    amber: {
        bg: 'bg-amber-50 dark:bg-amber-500/10',
        text: 'text-amber-500 dark:text-amber-100',
        dot: 'bg-amber-500',
    },
    yellow: {
        bg: 'bg-yellow-50 dark:bg-yellow-500/10',
        text: 'text-yellow-500 dark:text-yellow-100',
        dot: 'bg-yellow-500',
    },
    lime: {
        bg: 'bg-lime-50 dark:bg-lime-500/10',
        text: 'text-lime-500 dark:text-lime-100',
        dot: 'bg-lime-500',
    },
    green: {
        bg: 'bg-green-50 dark:bg-green-500/10',
        text: 'text-green-500 dark:text-green-100',
        dot: 'bg-green-500',
    },
    emerald: {
        bg: 'bg-emerald-50 dark:bg-emerald-500/10',
        text: 'text-emerald-500 dark:text-emerald-100',
        dot: 'bg-emerald-500',
    },
    teal: {
        bg: 'bg-teal-50 dark:bg-teal-500/10',
        text: 'text-teal-500 dark:text-teal-100',
        dot: 'bg-teal-500',
    },
    cyan: {
        bg: 'bg-cyan-50 dark:bg-cyan-500/10',
        text: 'text-cyan-500 dark:text-cyan-100',
        dot: 'bg-cyan-500',
    },
    sky: {
        bg: 'bg-sky-50 dark:bg-sky-500/10',
        text: 'text-sky-500 dark:text-sky-100',
        dot: 'bg-sky-500',
    },
    blue: {
        bg: 'bg-blue-50 dark:bg-blue-500/10',
        text: 'text-blue-500 dark:text-blue-100',
        dot: 'bg-blue-500',
    },
    indigo: {
        bg: 'bg-indigo-50 dark:bg-indigo-500/10',
        text: 'text-indigo-500 dark:text-indigo-100',
        dot: 'bg-indigo-500',
    },
    purple: {
        bg: 'bg-purple-50 dark:bg-purple-500/10',
        text: 'text-purple-500 dark:text-purple-100',
        dot: 'bg-purple-500',
    },
    fuchsia: {
        bg: 'bg-fuchsia-50 dark:bg-fuchsia-500/10',
        text: 'text-fuchsia-500 dark:text-fuchsia-100',
        dot: 'bg-fuchsia-500',
    },
    pink: {
        bg: 'bg-pink-50 dark:bg-pink-500/10',
        text: 'text-pink-500 dark:text-pink-100',
        dot: 'bg-pink-500',
    },
    rose: {
        bg: 'bg-rose-50 dark:bg-rose-500/10',
        text: 'text-rose-500 dark:text-rose-100',
        dot: 'bg-rose-500',
    },
}

const CalendarView = (props) => {
    const { wrapperClass, DATA, ...rest } = props;

    const [availabilityData, setAvailabilityData] = useState(DATA);
    const [showAllShiftData, setShowAllShiftData] = useState(false);
    const [displayShowMoreBtn, setDisplayShowMoreBtn] = useState(true);
    const [showAllShiftDataList, setShowAllShiftDataList] = useState([]);

    const handleDateClick = (e) => {
        props.addDataToCalendarViewOnClick(e.dateStr);
    }

    useEffect(() => {
        setAvailabilityData(DATA);
    }, [DATA]);

    if (availabilityData) {
        const onlineEvents = availabilityData?.availability.filter(activeUser => activeUser.status === "active")?.map((avail) => ({
            title: availabilityData.name,
            start: avail.date,
            end: avail.date,
            timeSlot: avail.timeSlot,
            day: avail.day,
            type: "online",
            date: avail.date,
        }))

        // console.log('onlineEvents: ', onlineEvents);

        const offlineEvents = availabilityData?.availability.filter(user => user.status === "offline")?.map((avail) => ({
            title: "Holiday",
            start: avail.date,
            end: avail.date,
            type: "offline",
            date: avail.date
        }))

        const holidayEvents = availabilityData?.holidays.map(user => ({
            title: "Holiday",
            start: user,
            end: user,
            type: "holiday",
            date: user
        }));

        const AllEvents = [...onlineEvents, ...offlineEvents, ...holidayEvents];

        const handleDelete = (day, index) => {
            debugger
            const normalizeData = availabilityData.availability.map(item => {
                if (item.day === day) {
                    item.timeSlot = item.timeSlot.filter((_, i) => i !== index);
                    if (item.timeSlot.length === 0) {
                        item.status = 'offline';
                    }
                }
                return item;
            })
            setAvailabilityData({ ...availabilityData, availability: normalizeData });
            // setShowAllShiftDataList({ ...availabilityData, availability: normalizeData });
        };

        const handleShowMore = (timeSlot, day) => {
            debugger
            // console.log('Handle show more...TIMESLOT ', timeSlot);
            // console.log('extendedProps.day ', day);
            setShowAllShiftData(true);
            setShowAllShiftDataList(timeSlot);
            setDisplayShowMoreBtn(false);
        }

        const handleClosePopup = () => {
            setShowAllShiftData(false);
        }

        return (
            <div className={classNames('calendar', wrapperClass)} id="calendar">
                <FullCalendar
                    eventMinWidth={160}
                    initialView="dayGridMonth"
                    headerToolbar={{
                        left: 'title',
                        center: '',
                        right: 'dayGridMonth,prev,next',
                    }}
                    eventContent={(arg) => {
                        const { extendedProps } = arg.event;
                        // console.log('arg:: ', arg);
                        const maxDisplayCount = 2; // Maximum number of e`lements to display
                        const { timeSlot } = extendedProps;
                        return (
                            <div className={classNames('custom-calendar-event', props.calendarClass, 'gap-y-1')}>
                                {extendedProps.type === 'online' && (
                                    <>
                                        {/* {extendedProps.timeSlot.map((slot, index) => (
                                            <div className='flex gap-x-1'>
                                                <div key={index} className={classNames("font-semibold ml-1 rtl:mr-1 text-black deleteHover")} dangerouslySetInnerHTML={{ __html: slot + '<br/>' }} onClick={() => handleDelete(extendedProps.day, index)} />
                                            </div>
                                        ))} */}
                                        {timeSlot.slice(0, maxDisplayCount).map((slot, index) => (
                                            <div className='flex gap-x-1' key={index}>
                                                <div className={classNames("font-semibold ml-1 rtl:mr-1 text-black deleteHover")} dangerouslySetInnerHTML={{ __html: slot + '<br/>' }} onClick={() => handleDelete(extendedProps.day, index)} />
                                            </div>
                                        ))}
                                        {
                                            !displayShowMoreBtn && (
                                                timeSlot.slice(maxDisplayCount, timeSlot.length).map((slot, index) => (
                                                    <div className='flex gap-x-1' key={index}>
                                                        <div className={classNames("font-semibold ml-1 rtl:mr-1 text-black deleteHover")} dangerouslySetInnerHTML={{ __html: slot + '<br/>' }} onClick={() => handleDelete(extendedProps.day, (index+1))} />
                                                    </div>
                                                ))
                                            )
                                        }
                                        {displayShowMoreBtn && (timeSlot.length > maxDisplayCount) && (
                                            <div className='flex gap-x-1 showList'>
                                                <div className={classNames("font-semibold ml-1 rtl:mr-1 text-black")} onClick={(e) => handleShowMore(timeSlot,e)}>
                                                    +{timeSlot.length - maxDisplayCount} More
                                                </div>
                                            </div>
                                        )}
                                        {/* {
                                            showAllShiftData && (
                                                <div className="showShiftPopUp">
                                                    <div className="showShiftPopUpWrapper">
                                                        <p className="availableShifts">Available Shifts</p>
                                                        {
                                                            showAllShiftDataList.map((slot, index) => (
                                                                <div className='flex gap-x-1'>
                                                                    <div key={index} className={classNames("font-semibold ml-1 rtl:mr-1 text-black deleteHover")} dangerouslySetInnerHTML={{ __html: slot + '<br/>' }} onClick={() => handleDelete(extendedProps.day, index)} />
                                                                </div>
                                                            ))
                                                        }
                                                        <button className="closeBtn" onClick={() => handleClosePopup()}>X</button>
                                                    </div>
                                                </div>
                                            )
                                        } */}
                                    </>
                                )}
                                {/* {
                                    showAllShiftData && (
                                        <div className="showShiftPopUp">
                                            <div className="showShiftPopUpWrapper">
                                                <p className="availableShifts">Available Shifts</p>
                                                {
                                                    showAllShiftDataList.map((slot, index) => (
                                                        <div className='flex gap-x-1'>
                                                            <div key={index} className={classNames("font-semibold ml-1 rtl:mr-1 text-black deleteHover")} dangerouslySetInnerHTML={{ __html: slot + '<br/>' }} onClick={() => handleDelete(extendedProps.day, index)} />
                                                        </div>
                                                    ))
                                                }
                                                <button className="closeBtn" onClick={() => handleClosePopup()}>X</button>
                                            </div>
                                        </div>
                                    )
                                } */}
                                {(extendedProps.type === 'offline' || extendedProps.type === 'holiday') && (
                                    <div className="font-semibold ml-1 rtl:mr-1 text-black" style={{ backgroundColor: 'rgba(248, 215, 218, 0.8)', padding: '7px 15px', borderRadius: '10px' }}>Holiday</div>
                                )}
                            </div>
                        )
                    }}
                    events={AllEvents}
                    dateClick={handleDateClick}
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                    {...rest}
                    // selectable= {true}
                    dayCellClassNames={`dayCellHover ${showAllShiftData ? 'currentPopUP' : ''}`}
                    eventClassNames='eventClassName'
                />
            </div>
        )
    } else {
        return (
            <div className={classNames('calendar', wrapperClass)}>
                <FullCalendar
                    initialView="dayGridMonth"
                    headerToolbar={{
                        left: 'title',
                        center: '',
                        right: 'dayGridMonth,timeGridWeek,timeGridDay prev,next',
                    }}
                    eventContent={(arg) => {
                        const { extendedProps } = arg.event
                        const { isEnd, isStart } = arg
                        return (
                            <div
                                className={classNames(
                                    'custom-calendar-event',
                                    extendedProps.eventColor
                                        ? eventColors[extendedProps.eventColor]?.bg
                                        : '',
                                    extendedProps.eventColor
                                        ? eventColors[extendedProps.eventColor]
                                            ?.text
                                        : '',
                                    isEnd &&
                                    !isStart &&
                                    '!rounded-tl-none !rounded-bl-none !rtl:rounded-tr-none !rtl:rounded-br-none',
                                    !isEnd &&
                                    isStart &&
                                    '!rounded-tr-none !rounded-br-none !rtl:rounded-tl-none !rtl:rounded-bl-none'
                                )}
                            >
                                {!(isEnd && !isStart) && (
                                    <Badge
                                        className={classNames(
                                            'mr-1 rtl:ml-1',
                                            extendedProps.eventColor
                                                ? eventColors[
                                                    extendedProps.eventColor
                                                ].dot
                                                : ''
                                        )}
                                    />
                                )}
                                {!(isEnd && !isStart) && (
                                    <span>{arg.timeText}</span>
                                )}
                                <span className="font-semibold ml-1 rtl:mr-1">
                                    {arg.event.title}
                                </span>
                            </div>
                        )
                    }}
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                    {...rest}
                />
            </div>
        )
    }
}

export default CalendarView
