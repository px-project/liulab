/**
 * 头部之间
 */
import React, { Component } from 'react';
import { Row, Col } from 'antd';

import './style.scss';

export class Header extends Component {

	render() {
		let {xhttp} = this.props;
		let username = localStorage.getItem('user_name');

		return (
			<header id="header">
				<div className="user-info">
					<p className="user">
						<a href="#" className="logo"></a>
						<span className="name">{username}</span>
					</p>
					<p className="sign-out">
						<a onClick={this.logout.bind(this, xhttp)}><i className="fa fa-sign-out"></i></a>
					</p>
				</div>
			</header>
		);
	}

	logout(xhttp) {
		xhttp({ action: 'list', api: 'userLogout' }, () => {
			localStorage.setItem('role_name', null);
			localStorage.setItem('user_id', null);
			localStorage.setItem('user_name', null);
			localStorage.setItem('user_permission', null);

			window.location.href = '/logout.html';
		});
	}
}
