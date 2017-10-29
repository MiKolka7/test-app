import { cachedTime } from '../constants/global';

class Cache {
    set (name, data) {
        localStorage.setItem(name, JSON.stringify({
            time: Number(new Date()),
            data
        }));
    }

    get (name) {
        const data = JSON.parse(localStorage.getItem(name));
        const checkTime = data ? Number(new Date()) - data.time < cachedTime : false;

        return checkTime ? data.data : null;
    }
}

export default new Cache();
