import { GET_NEWS_ERROR, GET_NEWS_FETCH, GET_NEWS_FROM_CACHE, GET_NEWS_SUCCESS } from '../constants/actionTypes';
import { ALERT_ERROR_LOAD_DATA } from '../constants/global';
import Api from '../services/Api';
import Cache from '../services/Cache';

export const getNews = (sourceName, newsState) => (dispatch) => {
    const cachedNews = Cache.get('news');
    const dispatchData = (list, eventType) => {
        dispatch({
            type:    eventType,
            payload: {
                list: { ...list }
            }
        });
    };

    if (cachedNews && cachedNews[sourceName]) {
        return dispatchData(cachedNews, GET_NEWS_FROM_CACHE);
    }

    dispatch({
        type: GET_NEWS_FETCH
    });

    const prepareData = (data) => {
        const { filters } = newsState;
        const news = [
            {
                list:   data.articles,
                sortBy: data.sortBy
            }
        ];

        const allReq = filters
            .filter((item) => item !== data.sortBy)
            .map((sortBy) => Api.getNews(data.source, sortBy).then((res) => {
                news.push({
                    list: res.articles || [],
                    sortBy
                });
            }));

        Promise.all(allReq).then(() => {
            newsState.list[sourceName] = news;
            Cache.set('news', newsState.list);
            dispatchData(newsState.list, GET_NEWS_SUCCESS);
        });
    };

    Api.getNews(sourceName)
        .then(prepareData)
        .catch(() => {
            // =(
            alert(ALERT_ERROR_LOAD_DATA);
            dispatch({
                type:    GET_NEWS_ERROR,
                error:   true,
                payload: new Error(ALERT_ERROR_LOAD_DATA)
            });
        });
};
