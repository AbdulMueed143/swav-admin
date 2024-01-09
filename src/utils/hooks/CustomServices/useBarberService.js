import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import useQuery from '../useQuery'
import { apiFetchBarberShopDetail } from 'services/BarberService'

function useBarberService() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const query = useQuery()

    const { token, signedIn } = useSelector((state) => state.auth.session)

    const fetchBarberShopDetail = async (barberId) => {
        try {
            const resp = await apiFetchBarberShopDetail(barberId, token);

            console.log("fetchBarberShopDetail Resp ", resp);

            // if(resp.status === 200) {
                return resp;
            // }
            // else {
            //     //add some kind of error 
            //     return {
            //         status: -1,
            //         message: resp,
            //     }   
            // }

        } catch (errors) {
            return {
                status: -1,
                message: errors?.response?.data?.message || errors.toString(),
            }
        }

    }


    return {
        fetchBarberShopDetail,
    }
}

export default useBarberService
