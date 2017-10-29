import React, { Component } from 'react';

import { array, func } from 'prop-types';

import Styles from './style.scss';
import Filter from '../../components/Filter';

export default class AsideBar extends Component {
    static propTypes = {
        filters:  array.isRequired,
        onFilter: func.isRequired
    };

    _onSelect (newEl, type, val) {
        this.props.onFilter(newEl, type, val);
    }

    render () {
        const { filters } = this.props;

        const filterList = filters.map((item) => (
            <Filter
                key = { item.type }
                list = { item.params }
                selected = { item.selected }
                type = { item.type }
                onSelected = { (newEl, val) => this._onSelect(newEl, item.type, val) }
            />
        ));

        return (
            <aside className = { Styles.aside }>
                { filterList }
            </aside>
        );
    }
}
