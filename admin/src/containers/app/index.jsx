/**
 * 顶级容器
 */
import React, {Component} from 'react';
import {Header, Sidebar} from '../../components/app/';
import './style.scss';

export class AppContainer extends Component {
	componentWillMount () {
		// this.props.xhttp({
		// 	action: 'detail',
		// 	api: 'user',
		// 	params: [localStorage.getItem('user_id')]
		// }, (result) => {
		// 	window.currentUser = result;
		// });

		// this.props.xhttp({
		// 	action: 'detail',
		// 	api: 'role',
		// 	params: [localStorage.getItem('role_id')]
		// }, (result) => {
		// 	window.currentRole = result;
		// });
	}

	render() {
		return (
			<div className="container">
				<Sidebar {...this.props}></Sidebar>
				<div id="main">
					<Header {...this.props}></Header>
					{this.props.children}
				</div>
			</div>
		);
	}
}
