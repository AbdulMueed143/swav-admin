import { useSelector, useDispatch } from 'react-redux'
// import { setUser, initialState } from 'store/auth/userSlice'
import { apiGetServices, apiAddService } from 'services/ServicesService'
// import { onSignInSuccess, onSignOutSuccess, onSignInFailure, setToken, setSignedIn } from 'store/auth/sessionSlice'
import { useNavigate } from 'react-router-dom'
import useQuery from './useQuery'
import { values } from 'lodash'

function useBookingServices() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const query = useQuery()

    const { token, signedIn } = useSelector((state) => state.auth.session)

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
            console.log("Requeast to add a service")
            console.log(values)

            const resp = await apiAddService(token, values)
            console.log("Aftr req")

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
        addService,
    }
}

export default useBookingServices
