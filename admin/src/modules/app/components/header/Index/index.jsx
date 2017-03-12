/**
 * 头部之间
 */
import React, { Component } from 'react';
// import { AppHeaderUserComponent as User } from '../user';
// import { AppHeaderShopComponent as Shop } from '../shop';
// import { AppHeaderNavComponent as Nav } from '../nav';
import './style.scss';

export class Header extends Component {

	render() {
		let { routes, params } = this.props;
		return (
			<header id="header">
			</header>
		);
	}

}


				// <Nav routes={routes} params={params}></Nav>
				// {/*<Shop {...this.props}></Shop>*/}
				// <User {...this.props}></User>