import React, { Component } from 'react';

import { HashRouter, Route, Switch } from 'react-router-dom';

import PageSources from '../PageSources';
import PageNews from '../PageNews';

export default class App extends Component {
    render () {
        return (
            <HashRouter>
                <Switch>
                    <Route exact component = { PageSources } path = '/' />
                    <Route component = { PageNews } path = '/news/:id' />
                </Switch>
            </HashRouter>
        );
    }
}
