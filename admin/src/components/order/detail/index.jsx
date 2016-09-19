/**
 * 订单详情组件
 */
import React, {Component} from 'react';
import './style.scss';
import {Tabs, Table, Button, Timeline, Row, Col} from 'antd';
import moment from 'moment';
import * as consts from '../../../constants/';
const TabPane = Tabs.TabPane;


export class OrderDetailComponent extends Component {
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
	        	{orderData ? (
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
										render: (text, record, index) => {}
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
											return (
												<div>
													<a href="#">通过</a>
													<a href="#">不通过</a>
													<a href="#">已订货</a>
													<a href="#">已到货</a>
													<a href="#">取消</a>
												</div>
											);
										}
									}
								];


								return (

									<TabPane key={'tab_' + sheet_index} tab={sheet.product_type}>
										<Table columns={columns} dataSource={sheet.data[sheet_index]} scroll={{ x: 1300 }} pagination={false}></Table>
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
