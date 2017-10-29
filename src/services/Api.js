import { API_KEY, API_ROOT } from './../constants/global';

class Api {
    getSources () {
        return fetch(`${API_ROOT}/sources`)
            .then((res) => res.json())
            .then((data) => data.sources);
    }

    getNews (source, sortBy = '') {
        return fetch(`${API_ROOT}/articles?source=${source}&sortBy=${sortBy}&apiKey=${API_KEY}`)
            .then((res) => res.json());
    }
}

export default new Api();
