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
    //Gotta add the id we want to delete ... 
    return ApiService.fetchData({
        url: '/barber-availability-service/api/v1/barber/shop/holiday/' + deleteId,
        method: 'delete',
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}



//Gets all vocations for all barbers for the shop
export async function apiGetVocations(token) {
    return ApiService.fetchData({
        url: '/barber-availability-service/api/v1/barber/shop/vacations',
        method: 'get',
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

//adds vocation for barber provided in data 
/**
 * 
 * @param {*} token 
 * @param {*} data 
 * @returns 
 * 
 *     @NotBlank(message = "'barberId' is required for barber vacation")
    private String barberId;

    @NotNull(message = "Vacation 'startDateTime' is required")
    @Valid
    private CustomDate startDateTime;

    @NotNull(message = "Vacation 'endDateTime' is required")
    @Valid
    private CustomDate endDateTime;
 */
export async function apiAddVocation(token, data) {
    return ApiService.fetchData({
        url: '/barber-availability-service/api/v1/barber/vacation',
        method: 'post',
        data,
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export async function apiDeleteVocation(token, clienSearchableId) {
    //Gotta add the id we want to delete ... 
    return ApiService.fetchData({
        url: '/barber-availability-service/api/v1/barber/shop/vacation/' + clienSearchableId,
        method: 'delete',
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}


