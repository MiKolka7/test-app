import React, { Component } from 'react';

import { array, string } from 'prop-types';
import Source from '../Source';
import { ALERT_EMPTY_LIST } from '../../constants/global';

export default class SourceList extends Component {
    static propTypes = {
        list:      array.isRequired,
        filters:   array,
        range:     array,
        selected:  string
    };

    render () {
        const { list, filters, selected, range = [0, list.length] } = this.props;

        const sourceList = list
            .filter((source) =>
                !filters.some(({ selected: sel, type }) => (
                    !sel.length ? false : sel.indexOf(source[type])) === -1
                )
            )
            .filter((item, i) => i >= range[0] && i < range[1])
            .map(({ id, name, url, description }) => {
                const urlPart = url.split('//')[1];
                const logo = `https://icons.better-idea.org/icon?url=${urlPart}&size=120..120..200`;
                const isSelected = id === selected;
                const props = { id, name, url, description, logo, isSelected };

                return (
                    <Source key = { id } { ...props } />
                );
            });

        return list && sourceList.length ? [sourceList] : [ALERT_EMPTY_LIST];
    }
}
