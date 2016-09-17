/**
 * 侧边栏组件
 */
import React, {Component} from 'react';
import {Nav} from '../nav/';

import './style.scss';

export class Sidebar extends Component {
	render() {
		return (
			<sidebar id="sidebar">
				<Nav {...this.props}></Nav>
			</sidebar>
		);
	}
}
