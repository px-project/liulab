/**
 * 顶级容器
 */
import React, {Component} from 'react';
import {Header, Sidebar} from '../../components/app/';
import './style.scss';

export class AppContainer extends Component {
	render() {
		return (
			<div className="container">
				<Sidebar {...this.props}></Sidebar>
				<div id="main">
					<Header></Header>
					{this.props.children}
				</div>
			</div>
		);
	}
}
