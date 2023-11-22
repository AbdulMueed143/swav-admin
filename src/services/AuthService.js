import ApiService from './ApiService'

export async function apiSignIn(data) {
    return ApiService.fetchData({
        url: '/barber-service/api/v1/barber/authenticate',
        method: 'post',
        data,
    })
}

export async function apiSignOut(token) {
    // var authToken = `Bearer ${token}`;
    // var data = '';

    return ApiService.fetchData({
        url: '/barber-service/api/v1/barber/logout',
        method: 'post',
       
    })
}

export async function apiForgotPassword(data) {
    return ApiService.fetchData({
        url: '/barber-service/api/v1/auth/forgot-password',
        method: 'post',
        data,
    })
}

export async function apiResetPassword(data) {
    return ApiService.fetchData({
        url: '/barber-service/reset-password',
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
