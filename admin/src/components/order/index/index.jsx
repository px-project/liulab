/**
 * 订单列表组件
 */
import React, {Component} from 'react';
import moment from 'moment';
import {Row, Col, Table, Button} from 'antd';
import {Link} from 'react-router';
import * as consts from '../../../constants/';
import './style.scss';

export class OrderComponent extends Component  {

	componentWillMount () {
		this.props.xhttp({
			action: 'list',
			api: 'order',
			reload: true
		});

		this.props.xhttp({
			action: 'list',
			api: 'user',
			reload: true
		});
	}

    render () {
    	let {entities, order, user} = this.props;

    	let toggleStatusFilterArr = [];

		for (let key in consts.ORDER_STATUS) {
			toggleStatusFilterArr.push({
				text: consts.ORDER_STATUS[key],
				value: consts.ORDER_STATUS[key]
			});
		}

		let columns = [
			{
				title: '序号',
				key: 'index',
				render: (text, record, index) => {
					return index + 1;
				}
			},
			{
				title: '订单号',
				key: 'order_id',
				render: (text, record, index) => {
					return entities[record].order_id;
				}
			},
			{
				title: '产品类型',
				key: 'product_type',
				render: (text, record, index) => {
					return (
						<div>
							{
								entities[record].products.map((prod)=> {
									return (
										<span className="prod-type">{prod.product_type}</span>
									);
								})
							}
						</div>
					)
				}
			},
			{
				title: '订购人',
				key: 'user_id',
				render: (text, record, index) => {
					let currentUser = entities[entities[record].user_id];
					return currentUser.name || currentUser.username || '-';
				}
			},
			{
				title: '创建时间',
				key: 'create_time',
				render: (text, record, index) => {
					return moment(entities[record].create_time).format('YYYY-MM-DD hh:mm:ss');
				}
			},
			{
				title: '操作',
				ket: 'action',
				render: (text, record, index) => {
					let statusProgress = entities[record].progress;
					let status = statusProgress[statusProgress.length - 1].status;
					return (
						<div>
							<Link to={'/order/' + record}>详情</Link>
						</div>
					);
				}
			}
		];


		let rowSelection = {
			// selectedRowKeys,
			// onChange: this.onSelectChange,
		};

	    // const hasSelected = selectedRowKeys.length > 0;

        return (
			<div>
				<header className="list-header">
					<Row justify="end">
						<Col span={12}>
							<Button type="primary">下载</Button>
						</Col>
					</Row>
				</header>
				<Table columns={columns} dataSource={order.items} rowSelection={rowSelection}></Table>
			</div>
        );
    }
}
