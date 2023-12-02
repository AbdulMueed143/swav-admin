import { useSelector, useDispatch } from 'react-redux'
import { apiFetchBarbersWithAvailabilityTemplate, apiUpsertAvailabilityTemplate } from 'services/BarberAvailabilityService'
import { useNavigate } from 'react-router-dom'
import useQuery from '../useQuery'

function useAvailabilityService() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const query = useQuery()

    const { token, signedIn } = useSelector((state) => state.auth.session)

    const getBarbersWithAvailability = async () => {
        try {
            const resp = await apiFetchBarbersWithAvailabilityTemplate(token)
            //now I should have all the barbers, lets check the condition ..
            if(resp.status === 200) {
                return resp.data;
            }
            else {
                console.log(" failed");
                return [];
            }

        } catch (errors) {
            return []
        }

    }

    const updateBarberAvailability = async (editedBarber) => {
        try {
            const barberId = editedBarber.barberId;
    
            // Map each availability to a promise of an API call
            const apiCallPromises = editedBarber?.barberAvailability.map(barberAvailability =>
                apiUpsertAvailabilityTemplate(token, barberId, barberAvailability?.barberAvailabilitiesTemplate)
            );
    
            // Wait for all API calls to resolve
            const responses = await Promise.all(apiCallPromises);
    
            // Check if all responses are successful
            const allSuccessful = responses.every(resp => resp.status === 200);
    
            if (allSuccessful) {
                // Assuming you want to return all data from successful responses
                return responses.map(resp => resp.data);
            } else {
                console.log("One or more requests failed");
                return {
                    data : "One or more template could not be updated",
                    status: -1
                };
            }
        } catch (errors) {
            console.log("Error occurred:", errors);
            return {
                data : errors,
                status: -1
            };
        }
    };
    

    return {
        getBarbersWithAvailability,
        updateBarberAvailability
    }
}

export default useAvailabilityService
