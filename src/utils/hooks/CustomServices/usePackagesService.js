import { useSelector, useDispatch } from 'react-redux'
import { apiAddPackage, apiDeletePackage, apiGetPackages, apiUpdatePackage } from 'services/PackagesService'
import { useNavigate } from 'react-router-dom'
import useQuery from '../useQuery'

function usePackagesService() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const query = useQuery()

    const { token, signedIn } = useSelector((state) => state.auth.session)

    const getPackages = async () => {
        try {
            const resp = await apiGetPackages(token);

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

    const addPackage = async (values) => {
        try
        {
            const resp = await apiAddPackage(token, values);

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

    const deletePackage = async (selectedId) => {
        try
        {
            const resp = await apiDeletePackage(token, {"id" : selectedId});

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

    const updatePackage = async (values) => {
        try
        {
            const resp = await apiUpdatePackage(token, values)
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
        addPackage,
        updatePackage,
        getPackages,
        deletePackage
    }
}

export default usePackagesService
