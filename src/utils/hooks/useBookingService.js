import { useSelector, useDispatch } from 'react-redux'
import { apiGetServices, apiAddService, apiDeleteService, apiUpdateService, 
    apiAddBarber, apiGetBarbers, apiDisableBarber } from 'services/BookingService'
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

                console.log(resp.data);
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
            console.log(values);
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
            console.log("Some ERRROR");
            console.log(errors);

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

    // const addBarberAvailability = async (values, barber) => {
    //     try
    //     {
    //         console.log("Requeast to add a barber availability")
    //         console.log(values)
    //         values.barberId = barber.id;

    //         const resp = await apiAddBarberAvailability(token, values, barber)

    //         console.log(resp)
    //         if(resp.status === 200) {
    //             return resp;
    //         }
    //         else {
    //             return {
    //                 status: -1,
    //                 message: resp,
    //             }    
    //         }
    //     } catch (errors) {
    //         return {
    //             status: -1,
    //             message: errors?.response?.data?.message || errors.toString(),
    //         }
    //     }

    // }


    return {
        authenticated: token && signedIn,
        getServices,
        getBarbers,
        addService,
        addBarbers,
        deleteService,
        disableBarber,
        updateService,
        // addBarberAvailability
    }
}

export default useBookingServices
