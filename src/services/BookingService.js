import ApiService from './ApiService'

export async function apiGetServices(token) {
    return ApiService.fetchData({
        url: '/barber-service/api/v1/shop/amenities',
        method: 'get',
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export async function apiAddService(token, data) {
    return ApiService.fetchData({
        url: '/barber-service/api/v1/shop/amenity',
        method: 'post',
        data,
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export async function apiDeleteService(token, data) {
    return ApiService.fetchData({
        url: '/barber-service/api/v1/shop/amenity/id/' + data.id,
        method: 'delete',
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export async function apiUpdateService(token, data) {
    return ApiService.fetchData({
        url: '/barber-service/api/v1/shop/amenity/' + data.id,
        method: 'put',
        data,
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

//End of Services


//Barbers
export async function apiGetBarbers(token) {
    return ApiService.fetchData({
        url: '/barber-service/api/v1/shop/barbers',
        method: 'get',
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export async function apiAddBarber(token, data) {
    return ApiService.fetchData({
        url: '/barber-service/api/v1/shop/barber',
        method: 'post',
        data,
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export async function apiUpdateBarber(token, id, data) {
    return ApiService.fetchData({
        url: `/barber-service/api/v1/shop/barber/${id}`,
        method: 'put',
        data,
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}


export async function apiDisableBarber(token, barberId, status) {
    return ApiService.fetchData({
        url: `/barber-service/api/v1/shop/barber/disable/${barberId}/${status}`,
        method: 'patch',
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export async function apiFetchBookings(token, barbersIds, fromDate, toDate) {

    const requestBody = {
        barbersIds: barbersIds,
        bookingsFromDate: fromDate,
        bookingsToDate: toDate
    }

    console.log("barber booking mate!", token);

    return ApiService.fetchData({
        url: '/barber-service/api/v1/shop/bookings',
        method: 'post',
        data: requestBody,
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}


export async function apiUpdateBooking(token, bookingId, status) {
    const requestBody = {
        bookingId: bookingId,
        newBookingStatus: status
    }

    return ApiService.fetchData({
        url: '/barber-availability-service/api/v1/booking/update/status',
        method: 'patch',
        data: requestBody,
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}


export async function apiFetchBookingsForDate(token, bookingDate) {
    return ApiService.fetchData({
        url: `/barber-availability-service/api/v1/booking/available/for/${bookingDate}`,
        method: 'get',
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export async function apiFetchBookingAvailabilityForRange(token, fromDate, toDate) {
    return ApiService.fetchData({
        url: `/barber-availability-service/api/v1/booking/available/for/range/${fromDate}/${toDate}`,
        method: 'get',
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}


export async function apiCreateBooking(token, payload) {
    return ApiService.fetchData({
        url: '/barber-service/api/v1/barber/shop/booking/confirm',
        method: 'post',
        data: payload,
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}