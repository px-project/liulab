/**
 * 路由
 */
import React, { Component } from 'react';
import { Router, Route, IndexRoute, IndexRedirect, useRouterHistory } from 'react-router';
import * as containers from '../containers/';
import * as components from '../components/';
import routes from '../config/routes.json';
import { createHistory } from 'history';
const history = useRouterHistory(createHistory)({ basename: window.location.origin + '/' });

export default class Routes extends Component {
    render() {
        return (
            <Router history={history}>
                <Route path="/" component={containers.AppContainer}>
                    <IndexRedirect to="/index" />
                    {
                        routes.map((topLevel, index) => {
                            return (
                                <Route path={topLevel.path} key={index} component={containers[this.toCamelCase([topLevel.path, 'app'])]}>
                                    <IndexRoute component={components[this.toCamelCase([topLevel.path, 'component'])]} {...this.props}/>
                                    {
                                        topLevel.children ? topLevel.children.map((child, index) => {
                                            return (
                                                <Route path={child.path} key={index} component={components[child.componentName]}></Route>
                                            )
                                        }) : ''
                                    }
                                </Route>
                            )
                        })
                    }
                </Route>
            </Router>
        );
    }

    // 字符串数组转驼峰
    toCamelCase(strArr) {
        return strArr.map((item) => item.charAt(0).toUpperCase() + item.substr(1)).join('');
    }

}
