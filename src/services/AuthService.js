import ApiService from './ApiService'

export async function apiSignIn(data) {
    return ApiService.fetchData({
        url: '/barber-auth-service/api/v1/auth/authenticate',
        method: 'post',
        data,
    })
}

export async function apiSignOut(data) {
    return ApiService.fetchData({
        url: '/barber-auth-service/api/v1/auth/logout',
        method: 'post',
        data,
    })
}

export async function apiForgotPassword(data) {
    return ApiService.fetchData({
        url: '/barber-auth-service/api/v1/auth/forgot-password',
        method: 'post',
        data,
    })
}

export async function apiResetPassword(data) {
    return ApiService.fetchData({
        url: '/barber-auth-service/reset-password',
        method: 'post',
        data,
    })
}

//Links

export async function apiRegister(data) {
    return ApiService.fetchData({
        url: '/barber-service/api/v1/barber/shop/business/register',
        method: 'post',
        data,
    })
}
