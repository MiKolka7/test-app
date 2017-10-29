import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { func, object } from 'prop-types';

import Styles from './styles.scss';
import Pagination from '../../components/Pagination';
import AsideBar from '../../components/AsideBar';
import SourceList from '../../components/SourceList';
import { filterSources, getSources } from '../../actions/SourcesActions';
import Preloader from '../../components/Preloader';

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
        const { filters } = this.props.source;

        this.props.filterSources(filters, newEl, type, val);
    }

    render () {
        const { list, filters } = this.props.source;

        return (
            <div className = { Styles.page }>
                <AsideBar filters = { filters } onFilter = { this.onFilter } />
                <main className = { Styles.column }>
                    { list.length
                        ? <Pagination
                            classContainer = { Styles.column }
                            pageCount = { list.length }
                            pageSize = { 6 }>
                            <SourceList filters = { filters } list = { list } />
                        </Pagination>
                        : <Preloader />
                    }
                </main>
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
