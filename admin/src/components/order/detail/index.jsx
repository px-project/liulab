/**
 * 订单详情组件
 */
import React, {Component} from 'react';
import './style.scss';
import {Tabs, Table, Button, Timeline} from 'antd';
import moment from 'moment';
import * as consts from '../../../constants/';
const TabPane = Tabs.TabPane;


export class OrderDetailComponent extends Component  {
	componentWillMount () {
    	let _id = this.props.params.order_id;
		let {entities} = this.props;
		let orderData = entities[_id];

		if (!orderData) {
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



    render () {
    	let _id = this.props.params.order_id;
		let {entities} = this.props;
		let orderData = entities[_id];
        return (
        	<div>
	        	{
	        		orderData ? (
	        			<div>
			        		<div>
			        			<div>
				        			<h3>订单信息</h3>
				        			<div>
				        				<p>订单号：{orderData.order_id}</p>
				        				<p>订购时间：{moment(orderData.create_time).format('YYYY-MM-DD hh:mm:ss')}</p>
				        				<p>订购人：{entities[orderData.user_id].name
				        					 || entities[orderData.user_id].username || '-'
				        				}</p>
				        				<p>联系方式：{entities[orderData.user_id].phone || '-'}</p>
				        			</div>
				        		</div>
								<div>
									<h3>订单动态</h3>
									<Timeline>
										{
											orderData.progress.map((item) => {
												return (<Timeline.Item>
													 <span>{consts.ORDER_STATUS[item.status]}</span>
													 <span>{moment(item.time).format('YYYY-MM-DD hh:mm:ss')}</span>
												</Timeline.Item>);
											})
										}
									</Timeline>
								</div>
			        		</div>
							<div>
								<h3>商品详情</h3>
								<Tabs defaultActiveKey="tab_0">
									{
										orderData.products.map((sheet, index) => {

											let columns = [];

											sheet.fields.map((field, _index) => {
												columns.push({
													title: field.title,
													dataIndex: field.key,
													key: index + '_table_' + _index,
													width: 100
												});
											});

											// 第一列固定
											columns[0].fixed = 'left';
											columns[0].width = 100;

											return (

												<TabPane key={'tab_' + index} tab={sheet.product_type}>
													<Table columns={columns} dataSource={sheet.data[index]} scroll={{ x: 1300 }} pagination={false}></Table>
												</TabPane>
											);
										})
									}
								</Tabs>
							</div>
							<div className="action">
								<Button type="primary">再来一单</Button>
								<Button type="primary">通过审核</Button>
							</div>
	        			</div>
	        		) : ''
	        	}
        	</div>
        );
    }
}
