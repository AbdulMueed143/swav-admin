import ApiService from './ApiService'


export async function fetchBarbersMonthlyAvailability(token, requestBody) {

    return await ApiService.fetchData({
        url: `/barber-availability-service/api/v1/availabilities/shop/monthly`,
        method: 'post',
        data: requestBody,
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });
}


//Posting the template
export async function apiUpsertAvailabilityTemplate(token, barberId, availabilityTemplate) {
    return await ApiService.fetchData({
        url: `/barber-availability-service/api/v1/availability/template/barber/${barberId}`,
        method: 'post',
        data: availabilityTemplate,
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });
}

//Barbers
export async function apiFetchBarbersWithAvailabilityTemplate(token) {

    const response = await ApiService.fetchData({
        url: '/barber-service/api/v1/shop/barbers',
        method: 'get',
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    // Check if the response has the list
    if (!response || !response.data) {
        return response;
    }

    const barbers = response.data;


    // Traverse the list and fetch additional data for each barber
    for (const barber of barbers) {
        const barberAvailability = await fetchBarberAvailabilityTemplate(barber.barberId, token);
        barber.barberAvailability = barberAvailability;
    }

    response.data = barbers;

    return response;
}


async function fetchBarberAvailabilityTemplate(barberId, token) {
    // Replace this URL with the actual endpoint and modify parameters as needed
    const url = `/barber-availability-service/api/v1/availability/template/barber/${barberId}`;

    const response = await ApiService.fetchData({
        url: url,
        method: 'get',
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    // Return the additional data (you may need to adjust this based on your API response structure)
    return response.data;
}
