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

export async function apiForgotPassword(email) {

    return ApiService.fetchData({
        url: 'barber-service/api/v1/barber/password/forgot',
        method: 'post',
        data : {
            email: email
        },
    })
}

export async function apiResetTempPassword(email, password, sessionId) {

    let data = {
        email : email,
        tempAuthenticationSessionId : sessionId,
        newPassword: password
    }

    return ApiService.fetchData({
        url: '/barber-service/api/v1/barber/update/temp/password',
        method: 'put',
        data: data
    })
}

export async function apiResetForgotPassword(requestBody) {
    return ApiService.fetchData({
        url: '/barber-service/api/v1/barber/password/reset',
        method: 'post',
        data: requestBody,
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
