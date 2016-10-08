/**
 * 订单详情组件
 */
import React, {Component} from 'react';
import './style.scss';
import {Tabs, Table, Button, Timeline, Row, Col} from 'antd';
import moment from 'moment';
import * as consts from '../../../constants/';
const TabPane = Tabs.TabPane;
import classname from 'classname';


export class OrderDetailComponent extends Component {
	componentWillMount () {
    	let _id = this.props.params.order_id;
		let {entities} = this.props;
		let orderData = entities[_id];

		if (!orderData || !orderData.products) {
			this.props.xhttp({
				action: 'list',
				api: 'user'
			});

			this.props.xhttp({
				action: 'detail',
				api: 'order',
				params: [_id]
			});
		}
	}

	// 更新状态
	updateStatus (order_id, product_id, newStatus, xhttp, e) {
		xhttp({
			action: 'update',
			api: 'orderStatus',
			params: [order_id],
			data: {
				newStatus,
				product_id
			}
		});
	}


    render () {
    	let _id = this.props.params.order_id;
		let {entities, user, xhttp} = this.props;
		let orderData = entities[_id];

		let statusStr = consts.ORDER_STATUS;

        return (
        	<div>
	        	{orderData && user.items.length ? (
    			<div>
	        		<Row>
	        			<Col span={12}>

		        			<h3>订单信息</h3>
		        			<div>
		        				<p>订单号：{orderData.order_id}</p>
		        				<p>订购时间：{moment(orderData.create_time).format('YYYY-MM-DD hh:mm:ss')}</p>
		        				<p>订购人：{entities[orderData.user_id].name
		        					 || entities[orderData.user_id].username || '-'
		        				}</p>
		        				<p>联系方式：{entities[orderData.user_id].phone || '-'}</p>
		        			</div>
	        			</Col>
	        		</Row>
					<div>
						<h3>商品详情</h3>
						<Tabs defaultActiveKey="tab_0">
							{orderData.products.map((sheet, sheet_index) => {
								let columns = [
									{
										title: '序号',
										render: (text, record, index) => {
											return index + 1;
										}
									},
									{
										title: '货号',
										dataIndex: 'code',
									},
									{
										title: '名称',
										dataIndex: 'name'
									},
									{
										title: '数量',
										dataIndex: 'num'
									},
									{
										title: '单价',
										dataIndex: 'unit_price'
									},
									{
										title: '状态',
										dataIndex: 'progress',
										render: (text, record, index) => {
											let currentState = record.progress[record.progress.length - 1].status;
											return statusStr[currentState];
										}
									},
									{
										title: '更新时间',
										dataIndex: 'update_time',
										render: (text, record, index) => {
											return moment(text).format('YYYY-MM-DD hh:mm:ss');
										}

									},
									{
										title: '操作',
										render: (text, record, index) => {
											let currentState = record.progress[record.progress.length - 1].status;
											return (
												<div className="action">
													<a href="#">详情</a>
													{currentState === 'pending' ? (
														<div>
															<a onClick={this.updateStatus.bind(this, _id, record.product_id, 'pended', xhttp)}>通过</a>
															<a onClick={this.updateStatus.bind(this, _id, record.product_id, 'failed', xhttp)}>不通过</a>
															<a href="#">修改</a>
															<a onClick={this.updateStatus.bind(this, _id, record.product_id, 'cancel', xhttp)}>取消</a>
														</div>
													): ''}
													{currentState === 'pended' ? (
														<a onClick={this.updateStatus.bind(this, _id, record.product_id, 'processing', xhttp)}>已订货</a>
													): ''}
													{currentState === 'processing' ? (
														<a onClick={this.updateStatus.bind(this, _id, record.product_id, 'success', xhttp)}>已到货</a>
													): ''}
												</div>
											);
										}
									}
								];


								return (

									<TabPane key={'tab_' + sheet_index} tab={sheet.product_type}>
										<Table columns={columns} dataSource={sheet.data} pagination={false}></Table>
									</TabPane>
								);
							})}
						</Tabs>
					</div>
					<div className="action">
						<Button type="primary">再来一单</Button>
					</div>
    			</div>) : ''}
        	</div>
        );
    }
}
