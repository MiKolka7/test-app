// Core
import React from 'react';
// Instruments
import { range } from 'lodash';
import Style from './style.scss';

const Preloader = () => {
    const circles = range(1, 11).map((item) => <div key = { item } />);

    return (
        <div className = { Style.holder }>
            <div className = { Style.preloader }>{ circles }</div>
        </div>
    );
};

export default Preloader;
