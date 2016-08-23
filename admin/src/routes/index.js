/**
 * 路由
 */
import React, { Component } from 'react';
import { Router, Route, IndexRedirect, browserHistory } from 'react-router';
import * as containers from '../containers/';
import routes from '../config/routes.json';

export default class Routes extends Component {
    render() {
        return (
            <Router history={browserHistory}>
	            <Route path="/" component={containers.AppContainer}>
	            	<IndexRedirect to="/index" />
					{
						this.genRouterConfig(routes).map((item, index) => {
							return (
								<Route path={item.path} key={index} component={containers[item.componentName]}></Route>
							);
						})
		            }
	            </Route>
            </Router>
        );
    }

    // 配置扁平化处理
    genRouterConfig(routes) {
        let router = [];
        routes.map((route) => {
            router.push({
                path: route.path,
                name: route.name,
                componentName: route.path.charAt(1).toUpperCase() + route.path.substr(2) + 'App'
            });
            if (route.children && route.children instanceof Array) {
                route.children.map((_route) => {
                    router.push({
                        path: route.path + _route.path,
                        name: _route.name,
                        componentName: route.path.charAt(1).toUpperCase() + route.path.substr(2) + 'App'
                    })
                })
            }
        });
        return router;
    }
}
