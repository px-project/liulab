/**
 * 侧边栏导航
 */
import React, {Component} from 'react';
import {Link} from 'react-router';
import routes from '../../../../config/routes.json';
import {Menu} from 'antd';
import './style.scss';

export class Nav extends Component {
	render () {
		return (
			<nav className="sidebar-nav">
				<Menu>
					{
						routes.map((item, index) => {
							return (
								<Menu.Item key={index}><Link to={item.path}>{item.name}</Link></Menu.Item>
							);
						})
					}
				</Menu>
			</nav>
		);
	}
}
