import React, { Component } from 'react';

import { array } from 'prop-types';
import News from '../News';

export default class NewsList extends Component {
    static propTypes = {
        list: array.isRequired
    };

    render () {
        const { list } = this.props;

        const news = list.map(({ author, title, description, url, urlToImage, publishedAt }) => {
            const props = { author, title, description, url, urlToImage, publishedAt };

            return (
                <News key = { title + publishedAt } { ...props } />
            );
        });

        return [news];
    }
}
