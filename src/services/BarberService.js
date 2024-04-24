import ApiService from './ApiService'

export async function apiGetAllBarbers(data) {
    return ApiService.fetchData({
        url: '/api/v1/auth/barber',
        method: 'post',
        data,
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
    return response.data;
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
