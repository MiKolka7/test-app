import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import cx from 'classnames';

import { func, object } from 'prop-types';
import Styles from './styles.scss';
import Pagination from '../../components/Pagination';
import SourceList from '../../components/SourceList';
import { getNews } from '../../actions/NewsActions';
import { getSources } from '../../actions/SourcesActions';
import NewsList from '../../components/NewsList';
import Preloader from '../../components/Preloader';

class PageNews extends Component {
    static propTypes = {
        getNews:    func.isRequired,
        getSources: func.isRequired,
        location:   object.isRequired,
        news:       object.isRequired,
        source:     object.isRequired
    };

    state = {
        sortBy: null
    };

    componentWillMount () {
        const { location, news, source: { filters }} = this.props;
        const sourceName = this._getSelectedSource(location);

        this.props.getSources(filters);
        this.props.getNews(sourceName, news);
    }

    componentWillReceiveProps (newProps) {
        const { location, news } = this.props;

        if (location !== newProps.location) {
            const sourceName = this._getSelectedSource(newProps.location);

            this.props.getNews(sourceName, news);
            this._setFilterNews(null);
        }
    }

    _getSelectedSource (location) {
        return location.pathname.split('/').slice(-1)[0];
    }

    _setFilterNews (sortBy) {
        this.setState(() => ({ sortBy }));
    }

    _renderNewsFilters (newObj, sourceName, selectedSortBy) {
        const { filters } = this.props.news;
        let filterList = [];

        if (newObj[sourceName]) {
            filterList = filters.map((filterName) => {
                const item = newObj[sourceName].find((news) => news.sortBy === filterName);

                return (
                    <button
                        className = { cx({ [Styles.isActive]: item.sortBy === selectedSortBy }) }
                        disabled = { !item.list.length }
                        key = { item.sortBy }
                        onClick = { () => this._setFilterNews(item.sortBy) }>
                        { item.sortBy }
                    </button>
                );
            });
        }

        return (
            <nav className = { Styles.filterList }>{ filterList }</nav>
        );
    }

    _getNews (newObj, sourceName, sortBy) {
        if (newObj[sourceName]) {
            const check = (item) => sortBy ? item.sortBy === sortBy : item.list.length;

            return newObj[sourceName].filter(check)[0];
        }

        return {};
    }

    render () {
        const { sortBy } = this.state;
        const { location } = this.props;
        const { list: sourceList, filters: sourceFilters } = this.props.source;
        const { list: newsObj } = this.props.news;
        const sourceName = this._getSelectedSource(location);

        const news = this._getNews(newsObj, sourceName, sortBy);
        const newsFilters = this._renderNewsFilters(newsObj, sourceName, sortBy || news.sortBy);

        return (
            <div className = { Styles.page }>
                <section className = { Styles.column }>
                    <a href = '#/'>Home</a>
                    { sourceList.length
                        ? <Pagination
                            classContainer = { Styles.column }
                            pageSize = { 16 }>
                            <SourceList
                                filters = { sourceFilters }
                                list = { sourceList }
                                selected = { sourceName }
                            />
                        </Pagination>
                        : <Preloader />
                    }
                </section>
                <main className = { cx(Styles.column, Styles.columnArticles) }>
                    <header className = { Styles.header }>{ newsFilters }</header>
                    { news.list && news.list.length
                        ? <Pagination
                            classContainer = { cx(Styles.column, Styles.hFlexStart) }
                            pageSize = { 6 }>
                            <NewsList list = { news.list } />
                        </Pagination>
                        : <Preloader />
                    }
                </main>
            </div>
        );
    }
}


function mapStateToProps ({ source, news }) {
    return { source, news };
}

function mapDispatchToProps (dispatch) {
    return {
        getNews:    bindActionCreators(getNews, dispatch),
        getSources: bindActionCreators(getSources, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(PageNews);
