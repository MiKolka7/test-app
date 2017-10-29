import React, { Component } from 'react';

import range from 'lodash/range';
import { array, number, string } from 'prop-types';
import Styles from './style.scss';

export default class Pagination extends Component {
    static propTypes = {
        children:       array.isRequired,
        pageSize:       number.isRequired,
        classContainer: string
    };

    state = {
        selectCurrentPage: 1
    };

    componentWillReceiveProps (newProps) {
        const { children } = this.props;

        if (children !== newProps.children) {
            this._selectedPage(1);
        }
    }

    _selectedPage (selectCurrentPage) {
        this.setState(() => ({ selectCurrentPage }));
    }

    render () {
        const { children, classContainer, pageSize } = this.props;
        const { selectCurrentPage } = this.state;

        const childrenArr = React.Children.toArray(children);
        const content = childrenArr.slice((selectCurrentPage - 1) * pageSize, selectCurrentPage * pageSize);
        const pageCount = Math.round(childrenArr.length / pageSize);

        const list = range(1, pageCount + 1).map((item) => (
            <li
                key = { item }
                style = { item === selectCurrentPage ? { background: '#000' } : null }
                onClick = { () => this._selectedPage(item) }>
                { item }
            </li>
        ));

        return (
            <div style = { { flex: 1, width: '100%' } }>
                <div className = { classContainer }>
                    { content }
                </div>
                {list.length > 1 ? <ul className = { Styles.pagination }>{ list }</ul> : null}
            </div>
        );
    }
}
