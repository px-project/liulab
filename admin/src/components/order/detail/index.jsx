/**
 * 订单详情组件
 */
import React, { Component } from 'react';
import './style.scss';
import { Tabs, Table, Button, Timeline, Row, Col } from 'antd';
import moment from 'moment';
import * as consts from '../../../constants/';
const TabPane = Tabs.TabPane;
import classname from 'classname';


export class OrderDetailComponent extends Component {
	componentWillMount() {
		let order_id = this.props.params.order_id;
		let {entities, xhttp} = this.props;

		xhttp({
			action: 'detail',
			api: 'order',
			params: [order_id]
		}, (result) => {
			window.order_object_id = result._id;

			let templateIds = [];
			for (let templateId in result.products) {
				templateIds.push(templateId);
			}

			this.getTemplateData(this.props, templateIds);
		});
	}


	// 获取模板数据
	getTemplateData(props, templateIds, e) {
		let {xhttp} = props;
		templateIds.forEach((_id) => {
			props.xhttp({
				action: 'detail',
				api: 'template',
				params: [_id]
			});
		});
	}

	// 更新状态
	updateStatus(order_id, token, status, props, e) {
		props.xhttp({
			action: 'update',
			api: 'orderStatus',
			params: [order_id],
			data: {
				status,
				token
			}
		});
	}


	render() {
		let order_id = this.props.params.order_id;
		let {entities, order, template} = this.props;
		let orderData = entities[window.order_object_id];

		let statusStr = consts.ORDER_STATUS;

		return (
			<div>
				{orderData && template.items.length && (
					<div>
						<div className="basic">
							<div className="info">
								<p>订单号：{order_id}</p>
								<p>订购时间：{moment(orderData.create_time).format('YYYY-MM-DD hh:mm:ss')}</p>
								<p>订购人：{orderData.create_user.name || orderData.create_user.username || '-'}</p>
								<p>联系方式：{orderData.create_user.phone || '-'}</p>
							</div>
						</div>
						<div className="product">
							{template.items.map((template_id, template_index) => (
								<div className="product-detail" key={template_index}>
									<h5>{entities[template_id].name}</h5>

									<table className="ui table">
										<thead>
											<tr>
												<th>序号</th>
												{entities[template_id].template.map((tpl, index) => (<th key={index}>{tpl.title}</th>))}
												<th>状态</th>
												<th>操作</th>
											</tr>
										</thead>
										<tbody>
											{orderData.products[template_id].map((rowData, row) => {
												let currentStatus = rowData.progress[rowData.progress.length - 1].status;
												return (
													<tr key={row}>
														<td>{row + 1}</td>
														{entities[template_id].template.map((template, index) => (<td key={index}>{rowData[template.key]}</td>))}
														<td>{consts.ORDER_STATUS[currentStatus]}</td>
														<td>
															{currentStatus === 'pending' &&
																<div>
																	<a onClick={this.updateStatus.bind(this, order_id, rowData.token, 'pended', this.props)}>通过</a>
																	<a onClick={this.updateStatus.bind(this, order_id, rowData.token, 'failed', this.props)}>不通过</a>
																	<a href="#">修改</a>
																	<a onClick={this.updateStatus.bind(this, order_id, rowData.token, 'cancel', this.props)}>取消</a>
																</div>}
															{currentStatus === 'pended' && <a onClick={this.updateStatus.bind(this, order_id, rowData.token, 'processing', this.props)}>已订货</a>}
															{currentStatus === 'processing' && <a onClick={this.updateStatus.bind(this, order_id, rowData.token, 'success', this.props)}>已到货</a>}
															{currentStatus === 'cancel' && <p>已取消</p>}
															{currentStatus === 'cancel' && <p>不合格</p>}
														</td>
													</tr>
												);
											})}
										</tbody>
									</table>
								</div>
							))}
						</div>
						<div className="btn-group">
							<button className="ui button primary" type="primary">再来一单</button>
						</div>
					</div>)}
			</div>
		);
	}
}

