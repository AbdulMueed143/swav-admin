import axios from 'axios';
import { BaseUrl } from '../../config';

import { GET_SERVICES_START, GET_SERVICES_SUCCESS, GET_SERVICES_FAILURE, GET_PACKAGES_START, GET_PACKAGES_SUCCESS, GET_PACKAGES_FAILURE, GET_DATES_FAILURE, GET_DATES_SUCCESS, GET_DATES_START, GET_AVAILABLE_TIME_SLOT_FAILURE, GET_AVAILABLE_TIME_SLOT_SUCCESS, GET_AVAILABLE_TIME_SLOT_START } from '../actionType';
// import { masterAuthInstanceApi, signIn } from '../../services/Apis';

export const getServices = (shopId) => async (dispatch, getState) => {
    dispatch({ type: GET_SERVICES_START });

    try {
        const response = await axios.get(`${BaseUrl}barber-service/api/v1/shop/${shopId}/amenities`);

        dispatch({
            type: GET_SERVICES_SUCCESS,
            payload: response.data
        });

    } catch (error) {
        dispatch({ type: GET_SERVICES_FAILURE, payload: error.response })
    }
}

export const getPackages = (shopId) => async (dispatch, getState) => {
    dispatch({ type: GET_PACKAGES_START });

    try {
        const response = await axios.get(`${BaseUrl}barber-service/api/v1/shop/${shopId}/packages`);

        dispatch({
            type: GET_PACKAGES_SUCCESS,
            payload: response.data
        });

    } catch (error) {
        dispatch({ type: GET_PACKAGES_FAILURE, payload: error.response })
    }
}

export const getDateRangeBarbers = (payload) => async (dispatch, getState) => {
    dispatch({ type: GET_DATES_START });

    try {
        const response = await axios.post(`${BaseUrl}barber-availability-service/api/v1/availabilities/range/barber`, payload);

        dispatch({
            type: GET_DATES_SUCCESS,
            payload: response.data
        });

    } catch (error) {
        dispatch({ type: GET_DATES_FAILURE, payload: error.response })
    }
}

export const getAvailableSlots = (payload) => async (dispatch, getState) => {
    dispatch({ type: GET_AVAILABLE_TIME_SLOT_START });

    try {
        const response = await axios.post(`${BaseUrl}barber-availability-service/api/v1/availabilities/barber`, payload);

        dispatch({
            type: GET_AVAILABLE_TIME_SLOT_SUCCESS,
            payload: response.data
        });

    } catch (error) {
        dispatch({ type: GET_AVAILABLE_TIME_SLOT_FAILURE, payload: error.response })
    }
}