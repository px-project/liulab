/**
 * 侧边栏组件
 */
import React, { Component } from 'react';
import { AppSidebarNavComponent as Nav } from '../nav/';
import { AppSidebarLogoComponent as Logo } from '../logo/';

import './style.scss';

export class Sidebar extends Component {
	render() {
		return (
			<sidebar id="sidebar">
				<Logo></Logo>
				<Nav {...this.props}></Nav>
			</sidebar>
		);
	}
}
