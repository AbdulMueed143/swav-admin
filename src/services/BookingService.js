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


export async function apiGetBarbers(token) {
    return ApiService.fetchData({
        url: '/api/v1/shop/barbers',
        method: 'get',
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}


export async function apiAddBarber(token, data) {
    return ApiService.fetchData({
        url: '/api/v1/shop/add/barber',
        method: 'post',
        data,
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}


export async function apiAddBarberAvailability(token, data) {
    return ApiService.fetchData({
        url: '/api/v1/availabilities',
        method: 'post',
        data,
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

