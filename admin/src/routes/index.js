/**
 * 路由
 */
import React, { Component } from 'react';
import { Router, Route, IndexRoute, IndexRedirect, useRouterHistory } from 'react-router';
import * as containers from '../containers/';
import * as components from '../components/';
import routes from '../config/routes.json';
import { createHistory } from 'history';
import { toCamcel } from '../utils/';

const history = useRouterHistory(createHistory)({ basename: window.location.origin + '/' });

export default class Routes extends Component {
    render() {
        return (
            <Router history={history}>
                <Route path="/" component={containers.App}>
                    <IndexRedirect to="/index"/>

                    {routes
                        .filter(topLevel => window.permission.filter(item => item.module === topLevel.path)[0].allow)
                        .map((topLevel, index) => (
                            <Route path={topLevel.path} key={index} component={components[toCamcel(true, topLevel.path, 'component')]}>
                                {topLevel.children && topLevel.children.map((child, index) => (
                                    <Route path={child.path} key={index} component={components[child.componentName]} {...this.props}></Route>
                                ))}
                            </Route>
                        ))}
                </Route>
            </Router>
        );
    }
}