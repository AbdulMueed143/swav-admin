import React, {useState, useEffect, useMemo, useRef } from 'react'
import { Loading } from 'components/shared';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid'; // Import for week and day views
import interactionPlugin from '@fullcalendar/interaction'; // Import for week and day views
import moment from 'moment';
import useBookingServices from 'utils/hooks/useBookingService';
import Checkbox from 'components/ui/Checkbox';
import { idToColor, hexToRgb } from '../utils/colorCalculator';
import Button  from 'components/ui/Buttons/Button';
import { Dialog, FormContainer, FormItem, Segment } from 'components/ui';
import EditableBookingsListView from './EditableBookingsListView';
import ButtonWithIcon from 'components/ui/custom/barbers/ButtonWithIcon';
import Input from 'components/ui/Input';
import { Field, Form, Formik } from 'formik';
import { DatePicker, Select } from 'antd';
import usePackagesService from 'utils/hooks/CustomServices/usePackagesService';
import { useSelector } from 'react-redux';
import * as Yup from 'yup';
import { HiCheckCircle } from 'react-icons/hi';
import { useDispatch } from 'react-redux';

import './css/booking.css'
import { getAvailableSlots } from 'services/BarberAvailabilityService';
import useAvailabilityService from 'utils/hooks/CustomServices/useAvailabilityService';


const validationSchema = Yup.object().shape({
    barberName: Yup.string()
        .min(3, 'Too Short!')
        .required('Please input user name!'),
});


const Home = () => {

    //Selected Year and Month from calendar
    const today = new Date();
    const colorMap = new Map();
    const userInfo = useSelector((state) => state.auth.user);
    const dispatch = useDispatch();

    console.log("User information, barber information ", userInfo);
    

    const { fetchBookings, updateBarberBookings } = useBookingServices();
    const { getServices } = useBookingServices();
    const { getPackages } = usePackagesService();

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

    //Handle Booking
    const formIkRef = useRef();

    //Network

    //Users will be people
    //Lets ask phone number of the user, if user already exists, we will associate booking with them
    //If user does not exists in the system, we will create them, saying barber has created your account
    //Please use phone number to login

    const [users, setUsers] = useState([]);

    const [services, setServices] = useState([]); // Initial state as an empty array
    const [packages, setPackages] = useState([]);
    const [availableTimeSlots, setAvailableTimeSlots] = useState([]); // Initial state as an empty array

    const fetchServices = async () => {
        const data = await getServices();
        setServices(data);
    };

    const fetchPackages = async () => {
        const data = await getPackages();
        setPackages(data);
    };
    
    useEffect(() => {
        fetchServices();
        fetchPackages();
    }, []);
      
      // Map your services array to an array of options
    const serviceMap =  [
        { value: '', label: 'No Selection' },
         ...services.map(service => ({
            value: service.name,
            label: service.name,
        }))
    ];

    const packageMap = [
        { value: '', label: 'No Selection' },
        ...packages.map(p => ({
            value: p.name,
            label: p.name,
        }))
    ];
    //The services ends there


    const [selectedPackage, setSelectedPackage] = useState(null);
    const [selectedService, setSelectedService] =  React.useState([]);
    const selectedServicesMap = selectedService?.map(service => ({
        value: service.name,
        label: service.name + " ( " + service.price + " AUD, " +service.averageTimeInMinutes + " Minutes ) ",
    }));

    const [isCreateAppointmentDialogOpen, setIsCreateAppointmentDialogOpen] = useState(false);

    const [loadingBookingCreate, setLoadingBookingCreate] = useState(false);

    const handleOpenAppointmentDialog = () => {
        setIsCreateAppointmentDialogOpen(true);
    }

    const handleOpenAppointmentDialogClose = () => {
        setIsCreateAppointmentDialogOpen(false);
    }

    const { createBooking } = useBookingServices();

    const handleCreateBookingFormSubmit = async (values) => {

        setLoadingBookingCreate(true);
        // console.log('Selected Time:', values.availableTime);
        // console.log('Selected Services:', values.segment);
        // console.log('Selected Values:', values);


         //need to send request to create the booking ...
         const payload = {
            "bookingStartDateTime": values.availableTime,
            "barberId": userInfo.barberId,
            "barberShopId": userInfo.barberShopId,
            "amenitiesIds": services
                .filter(service => values?.segment?.includes(service.name))
                .map(service => service.id),
            "userMobileNumber": values.userMobileNumber,
            // "packagesIds": selectedPackage.id,
        }

        console.log("Booking Request ", payload);

        //send request to create the booking .... 

        //now se send the request to mark bookings as completed
        const response = await createBooking(payload);

        console.log("Server responses ", response);

        if(response.status == -1) {
            //failed 
            setLoadingBookingCreate(false);

        }
        else {
            //otherwise
            //reload

            setLoadingBookingCreate(false);
        }

        setIsCreateAppointmentDialogOpen(false);

    }

    function validateCreateBookingItems() {
        //Make sure either 1 service or package is selected
    }

    const { fetchAvailabilitySlots  } = useAvailabilityService();


    const dateFormatOnly = (date) => {
        const dateObject = new Date(date);

        const day = dateObject.getDate().toString().padStart(2, '0'); // Get day and pad with leading zero if necessary
        const month = (dateObject.getMonth() + 1).toString().padStart(2, '0'); // Get month (months are zero-based) and pad with leading zero if necessary
        const year = dateObject.getFullYear();

        const formattedDate = `${year}-${month}-${day}`; // Format the date as DD-MM-YYYY
        return formattedDate;
    }

    const handleDateSelect = async (date) => {

        //The barber that is by default selected is the one we are making bookings with
        //so we want its availabilites on date ...
        const data = {
            "date": dateFormatOnly(date),
            "barberId": userInfo.barberId
        }

        const availableSlots = await fetchAvailabilitySlots(data);

        console.log("Available Time Slots ", data, availableSlots);
        setAvailableTimeSlots(availableSlots);
    }

    const handleSetSelectedPackage  = (event) => {

        console.log("Selected ", event, event.target)
        setSelectedPackage(event);
    };


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

    // =======================================================
    const [isEditBookingDialogOpen, setIsEditBookingDialogOpen] = useState(false);
    const [currentSelectedDate, setCurrentSelectedDate] = useState();
    const [changedStatusBarberList, setChangedStatusBarberList] = useState([]);

    const handleDateClick = (arg) => {
        setIsEditBookingDialogOpen(true);
        setCurrentSelectedDate(arg.date);
    };

    const handleOnEditBookingDialogClose = () => {
        setIsEditBookingDialogOpen(false);
        //clean other things ... 
        setCurrentSelectedDate(null);
    }

    const handleOnEditBookingDialogOk = async () => {
        setIsEditBookingDialogOpen(false);

        //make changes depending on button pressed
        //Make network calls
        const response = await updateBarberBookings(changedStatusBarberList);

        setCurrentSelectedDate(null);
        setChangedStatusBarberList([]);

        if(response.status == -1) {
            //failed 
        }
        else {
            //otherwise
            //reload
            fetchBookingsForMonth(checkedBarbers, currentStartDate, currentEndDate);
        }
    }

    const onHandleBabarberStatusChange = (bookingId, newStatus) => {
        setChangedStatusBarberList(prevList => {
            // Check if the barberId already exists in the list
            const existingBarberIndex = prevList.findIndex(item => item.bookingId === bookingId);
    
            if (existingBarberIndex > -1) {
                // If it exists, update the status of the existing barber
                return prevList.map((item, index) =>
                    index === existingBarberIndex ? { ...item, status: newStatus } : item
                );
            } else {
                // If it doesn't exist, add the new barber and status to the list
                return [...prevList, { bookingId, status: newStatus }];
            }
        });
    }

    //=========== End of Edit Boooking Calendar view
    function formatDateToYYYYMMDD(date) {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Pad single digit months with a leading zero
        const day = date.getDate().toString().padStart(2, '0'); // Pad single digit days with a leading zero
        return `${year}-${month}-${day}`;
    }

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
        setCurrentStartDate(new Date(today.getFullYear(), today.getMonth(), 1));
        setCurrentEndDate(new Date(today.getFullYear(), today.getMonth() + 1, 0));
        
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

            console.log("Event Information ", eventInfo.event?.extendedProps);
    
            return (
                <div style={style}>
                    <span style={timeStyle}><b>{timeText}</b></span>
                    <span style={titleStyle}>{eventInfo.event.title}</span>
                    <span style={titleStyle}>{eventInfo.event.extendedProps.fullName}</span>
                    {eventInfo.event?.extendedProps?.serviceNames?.map((serviceName, index) => (
                        <span key={index} style={titleStyle}>{serviceName}</span>
                    ))}
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
            setCheckedBarbers(barberIds);

            const transformed = transformBookingsToCalendarEvents(response.data);
            setMonthlyBookings(transformed);
        }

        setIsFetchingData(false);
    }

    function transformBookingsToCalendarEvents(bookings) {

        console.log("transforming booking ", bookings);

        return bookings.map((booking, index) => ({
            id: index.toString(),
            bookingId: booking.id,
            title: booking.bookingStatus,
            start: booking.startTime,
            end: booking.endTime,
            fullName: booking.barber.firstName + " " + booking.barber.lastName,
            allDay: false,
            eventColor : colorMap.get(booking.barberId),
            serviceNames : booking.amenities?.map(amenity => amenity.name)
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

        <div style={{ marginBottom: '5px', display : 'flex', justifyContent: 'flex-end' }} >
                <ButtonWithIcon 
                    label="Add Appointment"
                    onClick={handleOpenAppointmentDialog} />
            </div>

            <Loading loading={loading} >

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


            <Button className="mr-2 mb-2" variant="twoTone" color="teal-900" onClick={applyFilter}>
                    Find Bookings
            </Button>

        </div>

          

            <FullCalendar
                showNonCurrentDates={false}
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]} // Include timeGridPlugin
                initialView='dayGridMonth'
                events={monthlyBookings}
                eventLimit={true}
                dayMaxEventRows={true}
                eventContent={renderEventContent}
                dateClick={handleDateClick}
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


            <Dialog
                isOpen={isEditBookingDialogOpen}
                 onClose={handleOnEditBookingDialogClose}
                onRequestClose={handleOnEditBookingDialogClose}
                style={{ minWidth: '680px', overflow:'auto' }}
                >
                <h5 className="mb-4">Edit Bookings</h5>
                <EditableBookingsListView selectedDate={currentSelectedDate} bookingData={monthlyBookings} onBarberStatusChange={onHandleBabarberStatusChange} />
                <div className="text-right mt-6">
                     <Button
                        className="ltr:mr-2 rtl:ml-2"
                        variant="plain"
                        onClick={handleOnEditBookingDialogClose}
                    >
                        Cancel
                    </Button>
                    <Button variant="solid" onClick={handleOnEditBookingDialogOk}>
                        Update Bookings
                    </Button>
                </div>
            </Dialog>



            <Dialog
                isOpen={isCreateAppointmentDialogOpen}
                 onClose={handleOpenAppointmentDialogClose}
                onRequestClose={handleOpenAppointmentDialogClose}
                style={{ minWidth: '680px', overflow:'auto' }}
                >
                <h5 className="mb-4">Create Booking</h5>


                <Formik
                    enableReinitialize
                    initialValues={{
                        barberName: userInfo.firstName + ' '+ userInfo.lastName,
                        bookingDate: new Date(),
                        userMobileNumber: '',

                    }}
                    validationSchema={validationSchema}
                    onSubmit={(values, { setSubmitting }) => {
                        handleCreateBookingFormSubmit(values);
                        setSubmitting(false);
                    }}
                >

            {({ values, touched, errors, resetForm, submitForm }) => (
                <div>

                <Form>
                            <FormContainer>
                                <div>
                                        <FormItem
                                            asterisk
                                            label="Barber Name"
                                            invalid={errors.barberName && touched.barberName}
                                            errorMessage={errors.barberName}>

                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <Field
                                                    disabled
                                                    name="barberName"
                                                    placeholder="Barber Name"
                                                    component={Input}
                                                    style={{ flex: 1 }} // Make the input take as much space as possible
                                                />
                                            </div>
                                        </FormItem>
                                </div>

                                <div>

                                    <FormItem 
                                        label="User (Mobile Number)">
                                            <div>Please make sure your add correct mobile number.</div>
                                            <Field
                                                placeholder="User Mobile Number (0413 XXX XXX)"
                                                asterick
                                                type="text"
                                                autoComplete="off"
                                                name="userMobileNumber"
                                                component={Input}
                                           / >
                                    </FormItem>
                                </div>

                                <FormItem
                                    asterisk
                                    label="Booking Date"
                                    invalid={errors.bookingDate && touched.bookingDate}
                                    errorMessage={errors.bookingDate}>
                                        <DatePicker 
                                            name="bookingDate"
                                            onChange={(newDate) => {
                                                handleDateSelect(newDate);
                                            }}
                                            placeholder="Pick booking date" />
                                </FormItem>

                                <div>
                                <FormItem
                                    asterisk
                                    label="Time"
                                    invalid={Boolean(errors.pickupTime && touched.pickupTime)}>
                                    
                                    <div className="available-time-container">
                                        {availableTimeSlots.map((timeslot) => (
                                        <label key={timeslot.startDateTime} className="available-time-option">
                                            <Field type="radio" name="availableTime" value={timeslot.startDateTime} />
                                            <div className="available-time-content">
                                            <div className="available-time-title">
                                                {new Date(timeslot.startDateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}
                                            </div>
                                            </div>
                                        </label>
                                        ))}
                                    </div>

                                    </FormItem>
                                </div>

                                <div>
                                    <FormItem
                                        asterisk
                                        label="Services"
                                        invalid={Boolean(
                                            errors.segment && touched.segment
                                        )}>
                                        <div className="segment-container">
                                        {services.map((service) => (
                                            <label key={service.id} className="segment-option">
                                            <Field type="checkbox" name="segment" value={service.name} />
                                            <div className="segment-content">
                                                <div className="segment-title">{service.name}</div>
                                                <div className="segment-description">{service.description}</div>
                                            </div>
                                            </label>
                                        ))}
                                        </div>
                                    </FormItem>
                                </div>

                                <div>
                                    <FormItem
                                        label="Package"
                                        >
                                        <Select
                                                isMulti
                                                placeholder="Please Select Package"
                                                options={packageMap}
                                                value={selectedPackage}
                                                onChange={handleSetSelectedPackage}
                                            ></Select>
                                    </FormItem>
                                </div>
                               
                            </FormContainer>
                </Form>

                
                <div className="text-right mt-6">
                    

                    <Loading loading={loadingBookingCreate} >

                        <Button
                            className="ltr:mr-2 rtl:ml-2"
                            variant="plain"
                            onClick={handleOpenAppointmentDialogClose}
                        >
                            Cancel
                        </Button>


                        <Button variant="solid" onClick={submitForm}>
                            Create Booking
                        </Button>
                    </Loading>

                    
                </div>

                </div>
                    )}
                </Formik>

            </Dialog>

        </div>
    </>
}

export default Home
