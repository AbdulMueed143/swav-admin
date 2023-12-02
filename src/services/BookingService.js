import ApiService from './ApiService'

export async function apiGetServices(token) {
    return ApiService.fetchData({
        url: '/barber-service/api/v1/shop/amenities',
        method: 'get',
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export async function apiAddService(token, data) {
    return ApiService.fetchData({
        url: '/barber-service/api/v1/shop/amenity',
        method: 'post',
        data,
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export async function apiDeleteService(token, data) {
    console.log("Log data object");
    console.log(data.id);

    //Gotta add the id we want to delete ... 
    return ApiService.fetchData({
        url: '/barber-service/api/v1/shop/amenity/id/' + data.id,
        method: 'delete',
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}


export async function apiUpdateService(token, data) {

    console.log(data);
    return ApiService.fetchData({
        url: '/barber-service/api/v1/shop/amenity/' + data.id,
        method: 'put',
        data,
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}
//End of Services


//Barbers
export async function apiGetBarbers(token) {
    return ApiService.fetchData({
        url: '/barber-service/api/v1/shop/barbers',
        method: 'get',
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}


export async function apiAddBarber(token, data) {
    return ApiService.fetchData({
        url: '/barber-service/api/v1/shop/barber',
        method: 'post',
        data,
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export async function apiDisableBarber(token, barberId, status) {
    return ApiService.fetchData({
        url: `/barber-service/api/v1/shop/barber/disable/${barberId}/${status}`,
        method: 'patch',
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}
