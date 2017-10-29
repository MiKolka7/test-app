// Core
import React from 'react';
import ReactDOM from 'react-dom';
// Instruments
import './theme/reset.css';
// App
import App from './containers/App';
import store from './store';
import { Provider } from 'react-redux';

ReactDOM.render(
    <Provider store = { store() }>
        <App />
    </Provider>,
    document.getElementById('root')
);
