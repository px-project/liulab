/**
 * 订单列表
 */
import React, { Component } from 'react';
import * as consts from '../../../../constants/';
import moment from 'moment';
import { Link } from 'react-router';
import './style.scss';

export class OrderListComponent extends Component {
	componentWillMount() {
		this.getOrderList();
	}

	render() {
		let toggleStatusFilterArr = Object.keys(consts.ORDER_STATUS).map(status => ({
			key: status,
			text: consts.ORDER_STATUS[status]
		}));

		let {order, entities} = this.props;

		return (
			<div className="order-list">
				{!order.fetching && order.items.length ? (
					<table className="ui table">
						<thead>
							<tr>
								<th><input type="checkbox" /></th>
								<th>序号</th>
								<th>订单号</th>
								<th>订购人</th>
								<th>进度</th>
								<th>创建时间</th>
								<th>操作</th>
							</tr>
						</thead>
						<tbody>
							{order.items.map((order_id, index) => (
								<tr key={index}>
									<td><input type="checkbox" /></td>
									<td>{index + 1}</td>
									<td>{entities[order_id].order_id}</td>
									<td>{entities[order_id].create_user}</td>
									<td className="progress">
										{toggleStatusFilterArr.map((item, index) => (
											<span className="item" key={index}><span>{item.text}</span><span>({entities[order_id].total[item.key]})</span></span>
										))}
									</td>
									<td>{moment(entities[order_id].create_time).format('YYYY-MM-DD hh:mm:ss')}</td>
									<td><Link to={'/order/' + entities[order_id].order_id}>详情</Link></td>
								</tr>
							))}
						</tbody>
					</table>) : (
						<div className="not-data">
							暂无数据
						</div>
					)}
			</div>
		);
	}

	// 获取订单列表
	getOrderList(conditions = {}) {
		this.props.xhttp({ action: 'list', api: 'order', conditions, reload: true });
	}
}