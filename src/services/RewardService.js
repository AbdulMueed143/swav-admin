import ApiService from './ApiService'


export async function apiFetchRewards(token) {
    return ApiService.fetchData({
        url: '/barber-reward-service/api/v1/rewards',
        method: 'get',
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export async function apiAddReward(token, data) {
    return ApiService.fetchData({
        url: '/barber-reward-service/api/v1/reward',
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
        url: '/barber-reward-service/api/v1/reward/' + data.id + '/status/' + data.isActive,
        method: 'delete',
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}


export async function apiUpdateReward( token, data) {
    return ApiService.fetchData({
        url: '/barber-reward-service/api/v1/reward/update/' + data.id,
        method: 'put',
        data,
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}