import ApiService from './ApiService'

export async function apiFetchRewards(token) {
    return ApiService.fetchData({
        url: '/reward-service/api/v1/shop/rewards/',
        method: 'get',
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export async function apiAddReward(token, data) {
    return ApiService.fetchData({
        url: '/reward-service/api/v1/shop/package',
        method: 'post',
        data,
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export async function apiToggleRewardStatus( token, data) {
    //Gotta add the id we want to delete ... 
    return ApiService.fetchData({
        url: '/reward-service/api/v1/shop/package/' + data.id,
        method: 'delete',
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export async function apiUpdateReward( token, data) {
    return ApiService.fetchData({
        url: '/reward-service/api/v1/shop/package/' + data.id,
        method: 'put',
        data,
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}