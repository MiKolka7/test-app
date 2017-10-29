import {
    FILTER_SOURCES,
    GET_SOURCES_FETCH,
    GET_SOURCES_FROM_CACHE,
    GET_SOURCES_SUCCESS
} from '../constants/actionTypes';

const initialState = {
    list:     [],
    fetching: false,
    filters:  []
};

const source = (state = initialState, action) => {
    switch (action.type) {
        case GET_SOURCES_FETCH:
            return { ...state, fetching: true };

        case GET_SOURCES_SUCCESS:
        case GET_SOURCES_FROM_CACHE:
            return {
                ...state,
                list:     action.payload.list,
                filters:  action.payload.filters,
                cached:   action.payload.list,
                fetching: false
            };

        case FILTER_SOURCES:
            return {
                ...state,
                filters: action.payload
            };

        default:
            return state;
    }
};

export default source;