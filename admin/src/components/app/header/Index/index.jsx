/**
 * 头部之间
 */
import React, { Component } from 'react';

import './style.scss';

export class Header extends Component {

	render() {
		let {xhttp, userCurrent, entities} = this.props;
		let currentUser = entities[userCurrent.items[0]];

		return (
			<header id="header">
				<div className="user-info">
					{currentUser ? (
						<p className="user">
							<a href="#" className="avatar">
								{currentUser ? (<img src={`${window.server}/resource/${currentUser.avatar}`} />) : ''}
							</a>
							<span className="name">{currentUser.username}</span>
						</p>
					) : ''}
					<p className="sign-out">
						<a onClick={this.logout.bind(this)}><i className="fa fa-sign-out"></i></a>
					</p>
				</div>
			</header>
		);
	}

	logout() {
		this.props.xhttp({ action: 'list', api: 'userLogout' }, () => {
			window.location.href = '/logout.html';
		});
	}
}
