import ApiService from './ApiService'

export async function apiGetAllBarbers(payload) {
    return ApiService.fetchData({
        url: '/api/v1/auth/barber',
        method: 'post',
        payload,
    })
}

export async function apiFetchBarberShopDetail(barberId, token) {
    // Replace this URL with the actual endpoint and modify parameters as needed
    const url = `/barber-service/api/v1/shop/detail/${barberId}`;

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

export async function apiUpdateBarberShopCancellationPolicies(payload, token) {
    const url = `/barber-service/api/v1/shop/policy/cancellation`;

    return ApiService.fetchData({
        url: url,
        method: 'put',
        data: payload,
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export async function apiUpdateBarberShopDetail(shopDetail, token) {
    // Replace this URL with the actual endpoint and modify parameters as needed
    const url = `/barber-service/api/v1/shop/detail`;

    const response = await ApiService.fetchData({
        url: url,
        method: 'put',
        data: shopDetail,
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    // Return the additional data (you may need to adjust this based on your API response structure)
    return response;
}


export async function apiUpdateAfterHourSurcharge(surchargeDetail, token) {
    // Replace this URL with the actual endpoint and modify parameters as needed
    const url = `/barber-service/api/v1/shop/tax/surge/after-hours`;

    const response = await ApiService.fetchData({
        url: url,
        method: 'put',
        data: surchargeDetail,
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    // Return the additional data (you may need to adjust this based on your API response structure)
    return response;
}
