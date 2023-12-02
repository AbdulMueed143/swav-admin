import { useSelector, useDispatch } from 'react-redux'
import { apiAddHoliday, apiDeleteHoliday, apiGetHolidays } from 'services/HolidaysService'
import { useNavigate } from 'react-router-dom'
import useQuery from '../useQuery'

function useHolidaysService() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const query = useQuery()

    const { token, signedIn } = useSelector((state) => state.auth.session)

    const getHolidays = async () => {
        try {
            const resp = await apiGetHolidays(token);

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

    const addHoliday = async (values) => {
        try
        {
            console.log(values);
            const resp = await apiAddHoliday(token, values);

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

    const deleteHoliday = async (holidayId) => {
        try
        {
            console.log("Use holiday delete");
            console.log(holidayId);
            const resp = await apiDeleteHoliday(token, holidayId);

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
        addHoliday,
        getHolidays,
        deleteHoliday
    }
}

export default useHolidaysService
