import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { func, object } from 'prop-types';

import Styles from './styles.scss';
import Pagination from '../../components/Pagination';
import AsideBar from '../../components/AsideBar';
import { filterSources, getSources } from '../../actions/SourcesActions';
import Preloader from '../../components/Preloader';
import Source from '../../components/Source';
import Cather from '../../components/Cather';

class PageSources extends Component {
    static propTypes = {
        filterSources: func.isRequired,
        getSources:    func.isRequired,
        source:        object.isRequired
    };

    constructor () {
        super();

        this.onFilter = ::this._onFilter;
    }

    componentWillMount () {
        const { filters } = this.props.source;

        this.props.getSources(filters);
    }

    _onFilter (newEl, type, val) {
        const { source } = this.props;

        this.props.filterSources(source, newEl, type, val);
    }

    render () {
        const { list, listAfterFilters, filters } = this.props.source;
        const sources = listAfterFilters.length ? listAfterFilters : list;

        const sourceList = sources.map((source) => (
            <Source key = { source.id } { ...source } />
        ));

        return (
            <div className = { Styles.page }>
                <Cather>
                    <AsideBar filters = { filters } onFilter = { this.onFilter } />
                </Cather>
                <main className = { Styles.column }>
                    { sources.length
                        ? <Cather>
                            <Pagination classContainer = { Styles.column } pageSize = { 6 }>
                                {sourceList}
                            </Pagination>
                        </Cather>
                        : <Preloader />
                    }
                </main>
                {/*<SourceList
                    filters = { filters }
                    list = { list }
                    range = { [start, end] }
                />*/}
            </div>

        );
    }
}

function mapStateToProps ({ source }) {
    return { source };
}

function mapDispatchToProps (dispatch) {
    return {
        getSources:    bindActionCreators(getSources, dispatch),
        filterSources: bindActionCreators(filterSources, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(PageSources);
