import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import useQuery from '../useQuery'
import { apiUpdateAfterHourSurcharge } from 'services/BarberService'

function useTaxAndSurchageService() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const query = useQuery()

    const { token, signedIn } = useSelector((state) => state.auth.session)

    const updateAfterHourSurcharge = async (surchargeDetail) => {
        try {
            const resp = await apiUpdateAfterHourSurcharge(surchargeDetail, token);

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
        updateAfterHourSurcharge,
    }
}

export default useTaxAndSurchageService
