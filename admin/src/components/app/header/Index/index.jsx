/**
 * 头部之间
 */
import React, { Component } from 'react';
import {AppHeaderUserComponent as User, AppHeaderShopComponent as Shop} from '../index.js';

import './style.scss';

export class Header extends Component {

	render() {
		return (
			<header id="header">
				<Shop {...this.props}></Shop>
				<User {...this.props}></User>
			</header>
		);
	}

}
