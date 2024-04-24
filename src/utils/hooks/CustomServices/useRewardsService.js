import { useSelector, useDispatch } from 'react-redux'
import { apiAddReward,  apiFetchRewards, apiToggleRewardStatus, apiUpdateReward } from 'services/RewardService'
import { useNavigate } from 'react-router-dom'
import useQuery from '../useQuery'

function useRewardsService() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const query = useQuery()

    const { token, signedIn } = useSelector((state) => state.auth.session)

    const getRewards = async () => {
        try {
            const resp = await apiFetchRewards(token);

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

    const addReward = async (values) => {
        try
        {
            const resp = await apiAddReward(token, values);

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

    const toggleRewardStatus = async (selectedId) => {
        try
        {
            const resp = await apiToggleRewardStatus(token, {"id" : selectedId});

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

    const updateReward = async (values) => {
        try
        {
            const resp = await apiUpdateReward(token, values)
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
        addReward,
        updateReward,
        getRewards,
        toggleRewardStatus
    }
}

export default useRewardsService
