import ApiService from './ApiService'

export async function apiGetServices(token) {
    return ApiService.fetchData({
        url: '/api/v1/shop/services',
        method: 'get',
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}


export async function apiAddService(token, data) {
    return ApiService.fetchData({
        url: '/api/v1/shop/amenities',
        method: 'post',
        data,
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

