import { useSelector, useDispatch } from 'react-redux'
import { apiAddVocation, apiDeleteVocation, apiGetVocations } from 'services/HolidaysService'
import { useNavigate } from 'react-router-dom'
import useQuery from '../useQuery'

function useVocationService() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const query = useQuery()

    const { token, signedIn } = useSelector((state) => state.auth.session)

    const getVocations = async () => {
        try {
            const resp = await apiGetVocations(token);

            if(resp.status === 200) {
                return resp.data;
            }
            else {
                //add some kind of error 
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

    const addVocation = async (values) => {
        try
        {
            const resp = await apiAddVocation(token, values);

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

    const deleteVocation = async (clientSearchableId) => {
        try
        {
            const resp = await apiDeleteVocation(token, clientSearchableId);

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
        addVocation,
        getVocations,
        deleteVocation
    }
}

export default useVocationService
