/**
 * 订单模块容器
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';


class OrderContainer extends Component {
	render() {
		return (<div>{React.cloneElement(this.props.children, this.props) }</div>);
	}
}

export const OrderApp = connect()(OrderContainer);
