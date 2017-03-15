/**
 * 侧边栏导航
 */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import classname from 'classname';
import routerConfig from '../../../../../config/router.json';
import './style.scss';

export class AppSidebarNavComponent extends Component {
	render() {
		let { routes } = this.props;
		return (
			<nav className="sidebar-nav">
				<ul>
					{routerConfig.map((module, index) => (
						<li key={index} className={classname({ active: true })}>
							<Link to={`/${module.path}`}>
								<i className={`fa fa-${module.icon}`}></i>
								<span className="title">{module.title}</span>
							</Link>
						</li>
					))}
				</ul>
			</nav>
		);
	}
}