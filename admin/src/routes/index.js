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
        let router = routes.filter(topLevel => window.permission.filter(item => item.module === topLevel.path)[0].allow);

        return (
            <Router history={history}>
                <Route path="/" component={containers.App}>
                    {router.map((module, module_index) => (
                        <Route path={module.path} component={containers[toCamcel(true, module.path, 'container')]} key={module_index}>
                            {module.pages.map((page, page_index) => (
                                <Route path={page.path} component={components[toCamcel(true, module.path, page.component || page.path, 'component')]} key={[page_index]}>
                                    {page.children ? (page.children.map((child, child_index) => (
                                        <Route path={child.path} component={components[toCamcel(true, module.path, page.component || page.path, child.component || child.component, 'component')]} key={child_index}></Route>
                                    ))) : ''}
                                </Route>
                            ))}
                        </Route>
                    ))}
                </Route>
            </Router>
        );
    }
}