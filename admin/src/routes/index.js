/**
 * 路由
 */
import React, { Component } from 'react';
import { Router, Route, IndexRoute, IndexRedirect, useRouterHistory } from 'react-router';
import * as containers from '../containers/';
import * as components from '../components/';
import routes from '../config/routes.json';
import { createHistory } from 'history';
import {toCamcel} from '../utils/';
const history = useRouterHistory(createHistory)({ basename: window.location.origin + '/' });

export default class Routes extends Component {
    render() {
        return (
            <Router history={history}>

                <Route path="/login" component={containers.LoginApp}>

                </Route>
                <Route path="/" component={containers.AppContainer}>
                    <IndexRedirect to="/index" />
                    {
                        routes.map((topLevel, index) => {
                            return (
                                <Route path={topLevel.path} key={index} component={containers[toCamcel(true, topLevel.path, 'app')]}>
                                    <IndexRoute component={components[toCamcel(true, topLevel.path, 'component')]} {...this.props}/>
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
}
