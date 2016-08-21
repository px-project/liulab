/**
 * 侧边栏组件
 */
import React, {Component} from 'React';
import {Nav} from '../Nav/';

import './style.scss';

export class Sidebar extends Component {
	render () {
		return (
			<sidebar id="sidebar">
				<Nav></Nav>
			</sidebar>
		);
	}
}
