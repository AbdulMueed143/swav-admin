import ApiService from './ApiService'

export async function apiSignIn(data) {
    return ApiService.fetchData({
        url: '/barber-service/api/v1/barber/authenticate',
        method: 'post',
        data
    })
}

export async function apiSignOut(token) {

    return ApiService.fetchData({
        url: '/barber-service/api/v1/barber/logout',
        method: 'post',
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export async function apiForgotPassword(token, data) {
    return ApiService.fetchData({
        url: '/barber-service/api/v1/auth/forgot-password',
        method: 'post',
        data,
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export async function apiResetPassword(token, data) {
    return ApiService.fetchData({
        url: '/barber-service/reset-password',
        method: 'post',
        data,
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

//Links

export async function apiRegister(data) {
    return ApiService.fetchData({
        url: '/barber-service/api/v1/barber/shop/business/register',
        method: 'post',
        data
    })
}
