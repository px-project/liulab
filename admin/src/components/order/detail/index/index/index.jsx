/**
 * 订单详情组件
 */
import React, { Component } from 'react';
import moment from 'moment';
import * as consts from '../../../../../constants/';
import classname from 'classname';
import { OrderDetailTotalItemComponent as Item } from '../item/';
import './style.scss';


export class OrderDetailComponent extends Component {
	componentWillMount() {
		let {xhttp, params} = this.props;
		let {order_id} = params;

		xhttp.detail('order', [order_id]);
	}

	render() {
		return (
			<div className="order-detail-total page">
				<div className="order-info sec">

				</div>

				<div className="sec">
					<Item {...this.props}></Item>

				</div>
			</div>
		)
	}

}

