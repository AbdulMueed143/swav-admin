import ApiService from './ApiService'

export async function apiGetHolidays(token) {
    return ApiService.fetchData({
        url: '/barber-availability-service/api/v1/barber/shop/holidays',
        method: 'get',
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export async function apiAddHoliday(token, data) {
    return ApiService.fetchData({
        url: '/barber-availability-service/api/v1/barber/shop/holiday',
        method: 'post',
        data,
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export async function apiDeleteHoliday(token, deleteId) {
    console.log("Making Delete network call");
    console.log(deleteId);
    //Gotta add the id we want to delete ... 
    return ApiService.fetchData({
        url: '/barber-availability-service/api/v1/barber/shop/holiday/' + deleteId,
        method: 'delete',
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

