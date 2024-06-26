import { GET_SERVICES_START, GET_SERVICES_SUCCESS, GET_SERVICES_FAILURE, GET_PACKAGES_START, GET_PACKAGES_SUCCESS, GET_PACKAGES_FAILURE, GET_DATES_FAILURE, GET_DATES_SUCCESS, GET_DATES_START, GET_AVAILABLE_TIME_SLOT_FAILURE, GET_AVAILABLE_TIME_SLOT_SUCCESS, GET_AVAILABLE_TIME_SLOT_START } from '../actionType';

const initialState = {
    isLoading: false,
    servicesData:[],
    packagesData:[],
    availableDates:[],
    availableTimes:[]
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_SERVICES_START:
            return {
                ...state,
                isLoading: true
            };

        case GET_SERVICES_SUCCESS:
            return {
                ...state,
                isLoading: false,
                servicesData:action.payload
            };

        case GET_SERVICES_FAILURE:
            return {
                ...state,
                isLoading:false,
                servicesData:[]
            };
        
        case GET_PACKAGES_START:
            return {
                ...state,
                isLoading: true
            };

        case GET_PACKAGES_SUCCESS:
            return {
                ...state,
                isLoading: false,
                packagesData:action.payload
            };

        case GET_PACKAGES_FAILURE:
            return {
                ...state,
                isLoading:false,
                packagesData:[]
            };

        case GET_DATES_START:
            return {
                ...state,
                isLoading: true
            };

        case GET_DATES_SUCCESS:
            return {
                ...state,
                isLoading: false,
                availableDates:action.payload
            };

        case GET_DATES_FAILURE:
            return {
                ...state,
                isLoading:false,
                availableDates:[]
            };

       case GET_AVAILABLE_TIME_SLOT_START:
            return {
                ...state,
                isLoading: true
            };

        case GET_AVAILABLE_TIME_SLOT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                availableTimes:action.payload
            };

        case GET_AVAILABLE_TIME_SLOT_FAILURE:
            return {
                ...state,
                isLoading:false,
                availableTimes:[]
            };
        default:
            return state;
    }
};

export default reducer;