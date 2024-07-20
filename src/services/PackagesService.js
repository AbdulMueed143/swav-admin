import ApiService from './ApiService'

export async function apiGetPackages(token) {
    return ApiService.fetchData({
        url: '/barber-service/api/v1/shop/packages',
        method: 'get',
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}


export async function apiAddPackage(token, data) {
    return ApiService.fetchData({
        url: '/barber-service/api/v1/shop/package',
        method: 'post',
        data,
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export async function apiDeletePackage( token,data) {
    //Gotta add the id we want to delete ... 
    return ApiService.fetchData({
        url: '/barber-service/api/v1/shop/package/id/' + data.id,
        method: 'delete',
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}



export async function apiUpdatePackage( token, data) {
    return ApiService.fetchData({
        url: '/barber-service/api/v1/shop/package/' + data.id,
        method: 'put',
        data,
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}