/**
 * 顶级容器
 */
import React, {Component} from 'react';
import {Sidebar} from '../../components/app/sidebar/';
import {Header} from '../../components/app/header/';
import './style.scss';

export class AppContainer extends Component {
	render () {
		return (
			<div className="container">
				<Sidebar></Sidebar>
				<div id="main">
					<Header></Header>
					{this.props.children}
				</div>
			</div>
		);
	}
}
