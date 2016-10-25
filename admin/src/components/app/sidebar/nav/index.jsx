/**
 * 侧边栏导航
 */
import React, { Component } from 'react';
import { Link } from 'react-router';
import routes from '../../../../config/routes.json';
import { Menu } from 'antd';
import './style.scss';

export class Nav extends Component {
	render() {
		return (
			<nav className="sidebar-nav">
				<Menu selectedKeys={[this.props.routes[1].path]}>
					{
						routes
							.filter((topLevel) => window.permission.modules.filter(item => item.key === topLevel.path)[0].allow)
							.map((item, index) => {
								return (
									<Menu.Item key={item.path}><Link to={item.path}>{item.name}</Link></Menu.Item>
								);
							})
					}
				</Menu>
			</nav>
		);
	}
}
