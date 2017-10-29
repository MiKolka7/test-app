import React, { Component } from 'react';

import cx from 'classnames';
import { bool, string } from 'prop-types';
import Styles from './style.scss';

export default class Source extends Component {
    static propTypes = {
        description: string.isRequired,
        id:          string.isRequired,
        logo:        string.isRequired,
        name:        string.isRequired,
        url:         string.isRequired,
        isSelected:  bool
    };

    render () {
        const { id, url, name, description, logo, isSelected } = this.props;

        return (
            <article
                className = { cx({
                    [Styles.sourceTile]: true,
                    [Styles.isSelected]: isSelected
                }) }>
                <figure className = { Styles.img }>
                    <img alt = 'source-logo' src = { logo } />
                </figure>
                <h3 className = { Styles.title }>{ name }</h3>
                <div className = { Styles.sourceTileInfo }>
                    <a href = { url } target = 'blank'>Source home page</a>
                    <p>{ description }</p>
                    <a className = { Styles.button } href = { `#/news/${id}` }>
                        Source news
                    </a>
                </div>
            </article>
        );
    }
}
