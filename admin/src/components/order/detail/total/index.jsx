/**
 * 订单详情组件
 */
import React, { Component } from 'react';
import './style.scss';
import moment from 'moment';
import * as consts from '../../../../constants/';
import classname from 'classname';


export class OrderDetailComponent extends Component {
	componentWillMount() {
		let {xhttp, params} = this.props;
		let {order_id} = params;
		
		xhttp({action: 'detail', api: 'order', params: [order_id]});
	}



	render() {
		return (
			<div className="order-detail-total page">
			</div>
		)
	}

}

