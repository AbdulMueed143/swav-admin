import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import useQuery from '../useQuery'
import { apiUpdateBarberShopDetail } from 'services/BarberService'

function useBusinesssService() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const query = useQuery()

    const { token, signedIn } = useSelector((state) => state.auth.session)

    const updateShopDetail = async (shopDetails) => {
        try {
            const resp = await apiUpdateBarberShopDetail(shopDetails, token);

            if(resp.status === 200) {
                return resp;
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

    return {
        updateShopDetail,
    }
}

export default useBusinesssService
