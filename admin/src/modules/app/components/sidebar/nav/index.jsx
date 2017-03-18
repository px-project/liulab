/**
 * 侧边栏导航
 */
import React from 'react';
import { NavLink } from 'react-router-dom';
const routerConfig = require('../../../../../config/router.json');
import './style.scss';

export const SidebarNav = () => (
	<nav className="sidebar-nav">
		<ul>
			{routerConfig.map((module, index) => (
				<li key={index}>
					<NavLink to={`/${module.path}`} activeClasssName="active">
						<i className={`fa fa-${module.icon}`}></i>
						<span className="title">{module.title}</span>
					</NavLink>
				</li>
			))}
		</ul>
	</nav>
);