import { useSelector, useDispatch } from 'react-redux'
import { apiGetServices, apiAddService, apiAddBarber, apiGetBarbers, apiAddBarberAvailability } from 'services/BookingService'
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
                console.log(" failed")
                return [];
            }

        } catch (errors) {
            return []
        }
    }

    const addBarbers = async (values) => {
        try
        {
            console.log("Requeast to add a barbers")
            console.log(values)

            const resp = await apiAddBarber(token, values)
            console.log("Aftr Barber Add Request")

            console.log(resp)
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
                console.log(" failed")
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

    const addBarberAvailability = async (values, barber) => {
        try
        {
            console.log("Requeast to add a barber availability")
            console.log(values)
            values.barberId = barber.id;

            const resp = await apiAddBarberAvailability(token, values, barber)

            console.log(resp)
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



    return {
        authenticated: token && signedIn,
        getServices,
        getBarbers,
        addService,
        addBarbers,
        addBarberAvailability
    }
}

export default useBookingServices
