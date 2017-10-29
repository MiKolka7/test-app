import React, { Component } from 'react';

import range from 'lodash/range';
import { number, object, string } from 'prop-types';
import Styles from './style.scss';

export default class Pagination extends Component {
    static propTypes = {
        children:       object.isRequired,
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
        const pageCount = Math.round(childrenArr.length / pageSize);
        const content = childrenArr.slice((selectCurrentPage - 1) * pageSize, selectCurrentPage * pageSize);

        const list = range(1, pageCount + 1).map((item) => (
            <li
                key = { item }
                style = { item === selectCurrentPage ? { background: '#000' } : null }
                onClick = { () => this._selectedPage(item) }>
                { item }
            </li>
        ));

        return (
            <div style = { { width: '100%' } }>
                <div className = { classContainer }>
                    { content }
                </div>
                <ul className = { Styles.pagination }>{ list }</ul>
            </div>
        );
    }
}
