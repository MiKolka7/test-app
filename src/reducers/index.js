import { combineReducers } from 'redux';

import source from './source';
import news from './news';

export default combineReducers({
    source,
    news
});
