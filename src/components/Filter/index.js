import React, { Component } from 'react';

import { array, func, string } from 'prop-types';
import Styles from './style.scss';

export default class Filter extends Component {
    static propTypes = {
        list:       array.isRequired,
        selected:   array.isRequired,
        type:       string.isRequired,
        onSelected: func.isRequired
    };

    constructor () {
        super();

        this.handlerSelect = ::this._handlerSelect;
    }

    _handlerSelect (e) {
        this.props.onSelected(true, e.target.value);
    }

    _handlerUnSelect (val) {
        this.props.onSelected(false, val);
    }

    _checkDisabled (item) {
        const { selected } = this.props;

        return selected.indexOf(item) !== -1;
    }

    render () {
        const { list, selected, type } = this.props;

        const params = list.map((item) => (
            <option
                disabled = { this._checkDisabled(item) }
                key = { item }
                value = { item }>
                { item }
            </option>
        ));

        const selectedList = selected.map((item) => (
            <li key = { item } onClick = { () => this._handlerUnSelect(item) }>{ item }</li>
        ));

        return (
            <div className = { Styles.selectBox }>
                <select className = { Styles.select } onChange = { this.handlerSelect }>
                    <option disabled selected>- { type } -</option>
                    { params }
                </select>
                <ul className = { Styles.labelList }>{ selectedList }</ul>
            </div>
        );
    }
}
