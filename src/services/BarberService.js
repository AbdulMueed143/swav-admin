import ApiService from './ApiService'

export async function apiGetAllBarbers(data) {
    return ApiService.fetchData({
        url: '/api/v1/auth/barber',
        method: 'post',
        data,
    })
}
