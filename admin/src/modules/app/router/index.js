/**
 * 路由
 */
import React, { Component } from 'react';
import { Router, Route, IndexRoute, IndexRedirect, useRouterHistory } from 'react-router';
import { createHistory } from 'history';
import * as routes from '../../router';
import { AppContainer } from '../containers';

const history = useRouterHistory(createHistory)({ basename: window.location.origin + '/' });

export default class Routes extends Component {
    render() {
        let router = routes;
        return (
            <Router history={history}>
                <Route path="/" component={AppContainer}>
                    <IndexRedirect to="index"></IndexRedirect>
                    {Object.keys(router).map(name => router[name])}
                </Route>
            </Router>
        );
    }
}
