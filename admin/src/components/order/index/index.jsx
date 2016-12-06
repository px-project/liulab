/**
 * 订单列表组件
 */
import React, { Component } from 'react';
import { Link } from 'react-router';
import * as consts from '../../../constants/';
import { OrderListComponent as OrderList } from './order_list/';
import { ChildOrderListComponent as ChildOrderList } from './child_order_list/';

export class OrderComponent extends Component {

	componentDidMount () {
		$(this.refs.dropdown).dropdown();
	}

	render() {
		let {entities, order} = this.props;
		let {order_type = 'order'} = this.props.location.query;

		return (
			<div className="order-detail-page page">
				<header className="list-header">
					<div className="add">
						<button className="ui button primary">下载</button>
					</div>
					<div className="nav">
						<ul>
							<li><Link to={'/order'}>订单</Link></li>
							<li><Link to={'/order?order_type=child_order'}>子订单</Link></li>
						</ul>
					</div>
					<div className="group">
						<select className="ui select dropdown" ref="dropdown">
							<option value="">所有状态</option>
							{Object.keys(consts.ORDER_STATUS).map((status, index) => (
								<option key={index} value={status}>{consts.ORDER_STATUS[status]}</option>
							))}
						</select>
					</div>
					<div className="ui search">
						<div className="ui icon input">
							<input className="prompt" type="text" placeholder="" />
							<i className="search icon"></i>
						</div>
					</div>
				</header>

				<div className="list">
					{order_type === 'order' ? (<OrderList {...this.props}></OrderList>) : ''}
					{order_type === 'child_order' ? (<ChildOrderList {...this.props}></ChildOrderList>) : ''}
				</div>
			</div>
		);
	}
}
