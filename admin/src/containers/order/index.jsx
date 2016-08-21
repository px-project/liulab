/**
 * 订单模块容器
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';


class OrderContainer extends Component {
	render () {
		return (
			<h1>Order</h1>
		);
	}
}

export const OrderApp = connect()(OrderContainer);
