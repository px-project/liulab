/**
 * 订单列表组件
 */
import React, { Component } from 'react';
import moment from 'moment';
import { Row, Col, Table, Button } from 'antd';
import { Link } from 'react-router';
import * as consts from '../../../constants/';
import './style.scss';

export class OrderComponent extends Component {

	componentWillMount() {
		let {xhttp} = this.props;
		this.getOrderList(xhttp);
	}

	render() {
		let {entities, order} = this.props;

		let toggleStatusFilterArr = [];

		for (let key in consts.ORDER_STATUS) {
			toggleStatusFilterArr.push({
				key: key,
				text: consts.ORDER_STATUS[key]
			});
		}

		return (
			<div>
				<header className="list-header">
					<button className="ui button primary">下载</button>
				</header>
				{order.items.length &&
					<table className="ui table">
						<thead>
							<tr>
								<th><input type="checkbox" /></th>
								<th>序号</th>
								<th>订单号</th>
								<th>进度</th>
								<th>订购人</th>
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
									<td className="progress">
										{toggleStatusFilterArr.map((item, index) => (
											<span className="item" key={index}><span>{item.text}</span><span>({entities[order_id].total[item.key]})</span></span>
										))}
									</td>
									<td>{entities[order_id].create_user}</td>
									<td>{moment(entities[order_id].create_time).format('YYYY-MM-DD hh:mm:ss')}</td>
									<td><Link to={'/order/' + entities[order_id].order_id}>详情</Link></td>
								</tr>
							))}
						</tbody>
					</table>}
			</div>
		);
	}

	// 获取订单列表
	getOrderList(xhttp, conditions = {}) {
		xhttp({ action: 'list', api: 'order', conditions, reload: true });
	}
}
