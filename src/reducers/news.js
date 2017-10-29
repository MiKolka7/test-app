import { GET_NEWS_FETCH, GET_NEWS_FROM_CACHE, GET_NEWS_SUCCESS } from '../constants/actionTypes';

const initialState = {
    fetching: false,
    filters:  ['top', 'latest', 'popular'],
    list:     {}
};

const news = (state = initialState, action) => {
    switch (action.type) {
        case GET_NEWS_FETCH:
            return { ...state, fetching: true };

        case GET_NEWS_SUCCESS:
        case GET_NEWS_FROM_CACHE: {
            return {
                ...state,
                list:     action.payload.list,
                fetching: false
            };
        }
        default:
            return state;
    }
};

export default news;
