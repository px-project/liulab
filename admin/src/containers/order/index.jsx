/**
 * 订单模块容器
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';


class OrderContainer extends Component {
	render () {
		return (
			<div>{this.props.children}</div>
		);
	}
}

export const OrderApp = connect()(OrderContainer);
