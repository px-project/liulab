/**
 * 订单详情组件
 */
import React, { Component } from 'react';
import './style.scss';
import moment from 'moment';
import * as consts from '../../../constants/';
import classname from 'classname';


export class OrderDetailComponent extends Component {
	render () {
		return (<div>order detail</div>)
	}
	// componentWillMount() {
	// 	let {entities, xhttp, params} = this.props;
	// 	let {order_id} = params;

	// 	// 获取订单详情
	// 	this.getOrderDetail(xhttp, order_id, result => {
	// 		window.order_object_id = result._id;

	// 		// 获取品类详情
	// 		Object.keys(result.products).forEach(category_id => {
	// 			this.getCategoryDetail(xhttp, category_id);
	// 		});
	// 	});
	// }



	// render() {
	// 	let {entities, order, category, params} = this.props;
	// 	let {order_id} = params;
	// 	let orderData = entities[window.order_object_id];

	// 	let statusStr = consts.ORDER_STATUS;

	// 	return (
	// 		<div className="order-detail-page page">
	// 			{orderData && category.items.length === Object.keys(orderData.products).length ? (
	// 				<div className="book-order-detail">
	// 					<div className="basic">
	// 						<div className="info">
	// 							<p>订单号：{order_id}</p>
	// 							<p>订购时间：{moment(orderData.create_time).format('YYYY-MM-DD hh:mm:ss')}</p>
	// 							<p>订购人：{orderData.create_user.name || orderData.create_user.username || '-'}</p>
	// 							<p>联系方式：{orderData.create_user.phone || '-'}</p>
	// 						</div>
	// 					</div>
	// 					<div className="product">
	// 						{category.items.map((category_id, category_index) => (
	// 							<div className="product-detail" key={category_index}>
	// 								<h5>{entities[category_id].name}</h5>

	// 								<table className="ui table">
	// 									<thead>
	// 										<tr>
	// 											<th>序号</th>
	// 											{entities[category_id].attrs.map((attr, index) => (<th key={index}>{attr.title}</th>))}
	// 											<th>状态</th>
	// 											<th>操作</th>
	// 										</tr>
	// 									</thead>
	// 									<tbody>
	// 										{orderData.products[category_id].map((childOrder, row) => {
	// 											let currentStatus = childOrder.progress[childOrder.progress.length - 1].status;
	// 											return (
	// 												<tr key={row}>
	// 													<td>{row + 1}</td>
	// 													{entities[category_id].attrs.map((attr, index) => (<td key={index}>{childOrder[attr.field]}</td>))}
	// 													<td>{consts.ORDER_STATUS[currentStatus]}</td>
	// 													<td>
	// 														{currentStatus === 'pending' ? (
	// 															<div>
	// 																<a onClick={this.updateOrderStatus.bind(this, order_id, childOrder.token, 'pended', this.props)}>通过</a>
	// 																<a onClick={this.updateOrderStatus.bind(this, order_id, childOrder.token, 'failed', this.props)}>不通过</a>
	// 																<a href="#">修改</a>
	// 																<a onClick={this.updateOrderStatus.bind(this, order_id, childOrder.token, 'cancel', this.props)}>取消</a>
	// 															</div>) : ''}
	// 														{currentStatus === 'pended' ? (
	// 															<a onClick={this.updateOrderStatus.bind(this, order_id, childOrder.token, 'processing', this.props)}>已订货</a>) : ''}
	// 														{currentStatus === 'processing' ? (
	// 															<a onClick={this.updateOrderStatus.bind(this, order_id, childOrder.token, 'success', this.props)}>已到货</a>) : ''}
	// 														{currentStatus === 'cancel' ? (
	// 															<p>已取消</p>) : ''}
	// 														{currentStatus === 'cancel' ? (
	// 															<p>不合格</p>) : ''}
	// 													</td>
	// 												</tr>
	// 											);
	// 										})}
	// 									</tbody>
	// 								</table>
	// 							</div>))}
	// 					</div>
	// 					<div className="btn-group">
	// 						<button className="ui button primary" type="primary">再来一单</button>
	// 					</div>
	// 				</div>) : ''}
	// 		</div>
	// 	);
	// }


	// // 获取订单详情
	// getOrderDetail(xhttp, order_id, cb) {
	// 	xhttp({ action: 'detail', api: 'order', params: [order_id] }, cb);
	// }

	// // 获取品类详情
	// getCategoryDetail(xhttp, category_id, cb) {
	// 	xhttp({ action: 'detail', api: 'category', params: [category_id] }, cb);
	// }

	// // 更新订单状态
	// updateOrderStatus(order_id, token, status, props, e) {
	// 	props.xhttp({
	// 		action: 'update',
	// 		api: 'orderStatus',
	// 		params: [order_id],
	// 		data: {
	// 			status,
	// 			token
	// 		}
	// 	});
	// }
}

