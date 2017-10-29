import React, { Component } from 'react';

import { string } from 'prop-types';
import Styles from './style.scss';
import { parseDate } from '../../helpers';

export default class News extends Component {
    static propTypes = {
        description: string.isRequired,
        publishedAt: string.isRequired,
        title:       string.isRequired,
        url:         string.isRequired,
        author:      string,
        urlToImage:  string
    };

    render () {
        const { author, title, description, url, urlToImage, publishedAt } = this.props;
        const date = parseDate(new Date(publishedAt));

        return (
            <article className = { Styles.tile }>
                <img
                    alt = 'news-logo'
                    className = { Styles.img }
                    src = { urlToImage }
                />
                <h4 className = { Styles.title }>{ title }</h4>
                <div className = { Styles.info }>
                    <span>{ author }</span>
                    <time dateTime = { publishedAt }>{ date }</time>
                </div>
                <p className = { Styles.tileInfo }>{ description }</p>
                <a className = { Styles.button } href = { url } target = 'blank'>More</a>
            </article>
        );
    }
}
