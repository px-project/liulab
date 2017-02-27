/**
 * 侧边栏导航
 */
import React, { Component } from 'react';
import { Link } from 'react-router';
import classname from 'classname';
import './style.scss';

export class AppSidebarNavComponent extends Component {
	render() {
		let {routes, location} = this.props;
		return (
			<nav className="sidebar-nav">
				<ul>
					{routes[0].childRoutes.map((child, index) => (
						<li key={index} className={classname({ active: `/${child.path}`.indexOf(location.pathname) >= 0 })}>
							<Link to={`/${child.path}`}>
								<i className={`fa fa-${child.icon}`}></i>
								<span className="title">{child.name}</span>
							</Link>
						</li>
					))}
				</ul>
			</nav>
		);
	}
}