import { useSelector, useDispatch } from 'react-redux'
import { apiGetServices, apiAddService, apiDeleteService, apiUpdateService, 
    apiAddBarber, apiGetBarbers, apiDisableBarber, apiFetchBookings, 
    apiUpdateBooking, apiFetchBookingsForDate, apiFetchBookingAvailabilityForRange, 
    apiCreateBooking,
    apiUpdateBarber} from 'services/BookingService'
import { useNavigate } from 'react-router-dom'
import useQuery from './useQuery'
import { values } from 'lodash'

function useBookingServices() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const query = useQuery()

    const { token, signedIn } = useSelector((state) => state.auth.session)

    const getBarbers = async () => {
        try {
            const resp = await apiGetBarbers(token)

            if(resp.status === 200) {
                return resp.data;
            }
            else {
                return [];
            }

        } catch (errors) {
            return []
        }
    }

    const addBarbers = async (values) => {
        try
        {
            const resp = await apiAddBarber(token, values)
            if(resp.status === 200) {
                return resp;
            }
            else {
                return {
                    status: -1,
                    message: resp,
                }    
            }
        } catch (errors) {
            return {
                status: -1,
                message: errors?.response?.data?.message || errors.toString(),
            }
        }

    }

    const updateBarber = async (id, values) => {
        try
        {
            const resp = await apiUpdateBarber(token, id, values)
            if(resp.status === 200) {
                return resp;
            }
            else {
                return {
                    status: -1,
                    message: resp,
                }    
            }
        } catch (errors) {
            return {
                status: -1,
                message: errors?.response?.data?.message || errors.toString(),
            }
        }
    }

    const disableBarber = async (selectedId, checked) => {
        try
        {
            const resp = await apiDisableBarber(token, selectedId, checked ? "ACTIVE" : "DISABLED");
            if(resp.status === 200) {
                return resp;
            }
            else {
                return {
                    status: -1,
                    message: resp,
                }    
            }
        } catch (errors) {
            return {
                status: -1,
                message: errors?.response?.data?.message || errors.toString(),
            }
        }

    }

    const getServices = async () => {
        try {
            const resp = await apiGetServices(token)

            if(resp.status === 200) {
                return resp.data;
            }
            else {
                return [];
            }

        } catch (errors) {
            return []
        }

    }

    const addService = async (values) => {
        try
        {
            const resp = await apiAddService(token, values)

            if(resp.status === 200) {
                return resp;
            }
            else {
                return {
                    status: -1,
                    message: resp,
                }    
            }
        } catch (errors) {
            return {
                status: -1,
                message: errors?.response?.data?.message || errors.toString(),
            }
        }

    }


    const deleteService = async (selectedId) => {
        try
        {
            const resp = await apiDeleteService(token, {"id" : selectedId});

            if(resp.status === 200) {
                return resp;
            }
            else {
                return {
                    status: -1,
                    message: resp,
                }    
            }
        } catch (errors) {
            return {
                status: -1,
                message: errors?.response?.data?.message || errors.toString(),
            }
        }

    }

    const updateService = async (values) => {
        try
        {
            const resp = await apiUpdateService(token, values)
            if(resp.status === 200) {
                return resp;
            }
            else {
                return {
                    status: -1,
                    message: resp,
                }    
            }
        } catch (errors) {
            return {
                status: -1,
                message: errors?.response?.data?.message || errors.toString(),
            }
        }
    }

    const fetchBookings = async (barbersIds, fromDate, toDate) => {
        try
        {
            const resp = await apiFetchBookings(token, barbersIds, fromDate, toDate)
            if(resp.status === 200) {
                return resp;
            }
            else {
                return {
                    status: -1,
                    message: resp,
                }    
            }
        } catch (errors) {
            return {
                status: -1,
                message: errors?.response?.data?.message || errors.toString(),
            }
        }
    }

    const createBooking = async (payload) => {
        try
        {
            const resp = await apiCreateBooking(token, payload)

            if(resp.status === 200) {
                return resp;
            }
            else {
                return {
                    status: -1,
                    message: resp,
                }    
            }
        } catch (errors) {
            return {
                status: -1,
                message: errors?.response?.data?.message || errors.toString(),
            }
        }
    }

    const fetchBookingsForDate = async (bookingDate) => {
        try
        {
            const resp = await apiFetchBookingsForDate(token, bookingDate)

            if(resp.status === 200) {
                return resp;
            }
            else {
                return {
                    status: -1,
                    message: resp,
                }    
            }
        } catch (errors) {
            return {
                status: -1,
                message: errors?.response?.data?.message || errors.toString(),
            }
        }
    }

    const fetchBookingAvailabilityForRange = async (fromDate, toDate) => {
        try
        {
            const resp = await apiFetchBookingAvailabilityForRange(token,  fromDate, toDate)
            if(resp.status === 200) {
                return resp;
            }
            else {
                return {
                    status: -1,
                    message: resp,
                }    
            }
        } catch (errors) {
            return {
                status: -1,
                message: errors?.response?.data?.message || errors.toString(),
            }
        }
    }


    const updateBarberBookings = async (bookingsToUpdate) => {
        try {

            // Map each availability to a promise of an API call
            const apiCallPromises = bookingsToUpdate.map(booking =>
                apiUpdateBooking(token, booking.bookingId, booking.status)
            );
    
            // Wait for all API calls to resolve
            const responses = await Promise.all(apiCallPromises);
    
            // Check if all responses are successful
            const allSuccessful = responses.every(resp => resp.status === 200);
    
            if (allSuccessful) {
                return responses.map(resp => resp.data);
            } else {
                return {
                    data : "One or more template could not be updated",
                    status: -1
                };
            }
        } catch (errors) {
            return {
                data : errors,
                status: -1
            };
        }
    };


    return {
        authenticated: token && signedIn,
        getServices,
        getBarbers,
        addService,
        addBarbers,
        updateBarber,
        deleteService,
        disableBarber,
        updateService,
        fetchBookings,
        updateBarberBookings,
        fetchBookingAvailabilityForRange,
        fetchBookingsForDate,
        createBooking
        // addBarberAvailability
    }
}

export default useBookingServices
