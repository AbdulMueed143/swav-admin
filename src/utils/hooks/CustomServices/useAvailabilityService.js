import { useSelector, useDispatch } from 'react-redux'
import { apiFetchBarbersWithAvailabilityTemplate, apiUpsertAvailabilityTemplate, apiUpsertAvailabilityTemplateForDate, 
    fetchBarbersMonthlyAvailability, fetchBarberAvailabilityTemplateForDate } from 'services/BarberAvailabilityService'
import { useNavigate } from 'react-router-dom'
import useQuery from '../useQuery'

function useAvailabilityService() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const query = useQuery()

    const { token, signedIn } = useSelector((state) => state.auth.session);

    const getMonthlyAvailability = async (babersIds, year, month) => {
        try {
            
            const requestBody = {
                "barbersIds": babersIds,
                "month": month,
                "year": year
            };
            const resp = await fetchBarbersMonthlyAvailability(token, requestBody);
            //now I should have all the barbers, lets check the condition ..
            if(resp.status === 200) {
                return resp.data;
            }
            else {
                return {
                    data : "Could not get monthly data: ".resp,
                    status: -1
                };
            }

        } catch (errors) {
            return {
                data : errors,
                status: -1
            };
        }
    };

    const getBarbersWithAvailability = async () => {
        try {
            const resp = await apiFetchBarbersWithAvailabilityTemplate(token)
            //now I should have all the barbers, lets check the condition ..
            if(resp.status === 200) {
                return resp.data;
            }
            else {
                return [];
            }

        } catch (errors) {
            return []
        }

    };

    const fetchAvailabilityForDate = async (barberId, currentDate) => {
        try {
            const resp = await fetchBarberAvailabilityTemplateForDate(barberId, currentDate, token)
            //now I should have all the barbers, lets check the condition ..
            if(resp.status === 200) {
                return resp.data;
            }
            else {
                return [];
            }
        } catch (errors) {
            return []
        }
    };

    const updateBarberAvailability = async (barberId, availabilities) => {
        try {

            console.log("BarberId , Availabilities ", barberId, availabilities);
            // Map each availability to a promise of an API call
            const apiCallPromises = availabilities.map(barberAvailability =>
                apiUpsertAvailabilityTemplate(token, barberId, barberAvailability)
            );
    
            // Wait for all API calls to resolve
            const responses = await Promise.all(apiCallPromises);
    
            // Check if all responses are successful
            const allSuccessful = responses.every(resp => resp.status === 200);
    
            if (allSuccessful) {
                // Assuming you want to return all data from successful responses
                return responses.map(resp => resp.data);
            } else {
                return {
                    data : "One or more template could not be updated",
                    status: -1
                };
            }
        } catch (errors) {
            return {
                data : errors,
                status: -1
            };
        }
    };

    const updateBarberAvailabilityForDate = async (barberId, availabilities) => {
        try {
            // Map each availability to a promise of an API call
            const apiCallPromises = availabilities.map(barberAvailability =>
                apiUpsertAvailabilityTemplateForDate(token, barberId, barberAvailability)
            );
    
            // Wait for all API calls to resolve
            const responses = await Promise.all(apiCallPromises);
    
            // Check if all responses are successful
            const allSuccessful = responses.every(resp => resp.status === 200);
    
            if (allSuccessful) {
                // Assuming you want to return all data from successful responses
                return responses.map(resp => resp.data);
            } else {
                return {
                    data : "One or more template could not be updated",
                    status: -1
                };
            }
        } catch (errors) {
            return {
                data : errors,
                status: -1
            };
        }
    };

    return {
        getBarbersWithAvailability,
        updateBarberAvailability,
        getMonthlyAvailability,
        fetchAvailabilityForDate,
        updateBarberAvailabilityForDate
    }
}

export default useAvailabilityService
