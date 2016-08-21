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
						routes.map((route, index) => {
							return (
								<Route path={route.path} key={index}
									component={containers[route.path.charAt(1).toUpperCase() + route.path.substr(2) + 'App']}></Route>
							);
						})
		            }
	            </Route>
            </Router>
        );
    }
}
