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
const _ = require('lodash');

const history = useRouterHistory(createHistory)({ basename: window.location.origin + '/' });

export default class Routes extends Component {
    render() {
        let routeArr = [];
        routes
            .filter(topLevel => window.permission.filter(item => item.module === topLevel.path)[0].allow)
            .forEach(topLevel => {
                routeArr.push({ path: topLevel.path, componentName: toCamcel(true, topLevel.path, 'component'), name: topLevel.name });
                routeArr = routeArr.concat((topLevel.children || []).map(child => {
                    child.path = topLevel.path + '/' + child.path;
                    return child;
                }));
            });

        return (
            <Router history={history}>
                <Route path="/" component={containers.App}>
                    <IndexRedirect to="/index" />
                    {routeArr.map((r, index) => (
                        <Route key={index} path={r.path} component={components[r.componentName]}></Route>
                    ))}
                </Route>
            </Router>
        );
    }
}