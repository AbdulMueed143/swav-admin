import ApiService from './ApiService'

export async function apiSignIn(data) {
    return ApiService.fetchData({
        url: 'http://127.0.0.1:8080/api/v1/auth/authenticate',
        method: 'post',
        data,
    })
}

export async function apiSignUp(data) {
    return ApiService.fetchData({
        url: '/sign-up',
        method: 'post',
        data,
    })
}

export async function apiSignOut(data) {
    return ApiService.fetchData({
        url: 'http://127.0.0.1:8080/api/v1/auth/logout',
        method: 'post',
        data,
    })
}

export async function apiForgotPassword(data) {
    return ApiService.fetchData({
        url: '/forgot-password',
        method: 'post',
        data,
    })
}

export async function apiResetPassword(data) {
    return ApiService.fetchData({
        url: '/reset-password',
        method: 'post',
        data,
    })
}

//Links

export async function apiRegister(data) {
    return ApiService.fetchData({
        url: 'http://127.0.0.1:8080/api/v1/auth/register',
        method: 'post',
        data,
    })
}

export async function apiUpdateBusinessDetails(data) {
    return ApiService.fetchData({
        url: 'http://127.0.0.1:8080/api/v1/auth/updateBusinessDetails',
        method: 'put',
        data,
    })
}