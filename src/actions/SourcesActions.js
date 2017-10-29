import {
    FILTER_SOURCES,
    GET_SOURCES_ERROR,
    GET_SOURCES_FETCH,
    GET_SOURCES_FROM_CACHE,
    GET_SOURCES_SUCCESS
} from '../constants/actionTypes';
import { ALERT_ERROR_LOAD_DATA } from '../constants/global';
import Api from '../services/Api';
import Cache from '../services/Cache';

function createFilter (filters, list) {
    if (filters.length) {
        return filters;
    }

    const obj = {
        category: new Set(),
        language: new Set(),
        country:  new Set()
    };

    list.forEach((item) => {
        obj.category.add(item.category);
        obj.language.add(item.language);
        obj.country.add(item.country);
    });

    return [
        {
            type:     'category',
            params:   [...obj.category],
            selected: []
        },
        {
            type:     'language',
            params:   [...obj.language],
            selected: []
        },
        {
            type:     'country',
            params:   [...obj.country],
            selected: []
        }
    ];
}

function prepareSources (list) {
    return list.map((item) => {
        const urlPart = item.url.split('//')[1];
        const logo = `https://icons.better-idea.org/icon?url=${urlPart}&size=120..120..200`;

        return { ...item, logo };
    });
}

export const getSources = (filters) => (dispatch) => {
    const list = Cache.get('source');
    const dispatchData = (data, eventType) => {
        dispatch({
            type:    eventType,
            payload: {
                list:    data,
                filters: createFilter(filters, data)
            }
        });
    };

    if (list) {
        return dispatchData(list, GET_SOURCES_FROM_CACHE);
    }

    dispatch({
        type: GET_SOURCES_FETCH
    });

    Api.getSources()
        .then((data) => {
            const sources = prepareSources(data);

            Cache.set('source', sources);
            dispatchData(sources, GET_SOURCES_SUCCESS);
        })
        .catch((error) => {
            // =(
            alert(ALERT_ERROR_LOAD_DATA);
            dispatch({
                type:    GET_SOURCES_ERROR,
                error:   true,
                payload: new Error(ALERT_ERROR_LOAD_DATA)
            });
        });
};

export const filterSources = ({ list: sourceList, filters }, newEl, type, param) => (dispatch) => {
    if (!param) {
        return;
    }

    const index = filters.findIndex((item) => type === item.type);

    if (newEl) {
        // const i = filters[index].params.indexOf(param);
        // filters[index].params.splice(i, 1);
        filters[index].selected.push(param);
    } else {
        const i = filters[index].selected.indexOf(param);

        filters[index].selected.splice(i, 1);
        // filters[index].params.push(param);
    }

    const listAfterFilters = sourceList.filter((source) =>
        !filters.some(({ selected: sel, type: filterType }) => (
            !sel.length ? false : sel.indexOf(source[filterType])) === -1
        )
    );

    dispatch({
        type:    FILTER_SOURCES,
        payload: {
            filters: [...filters],
            listAfterFilters
        }
    });
};
