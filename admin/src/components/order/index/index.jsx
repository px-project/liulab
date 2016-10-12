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
					console.log(record);
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
				title: '订购人',
				key: 'user_id',
				render: (text, record, index) => {
					let currentUser = entities[entities[record].user_id];
					return currentUser.name || currentUser.username || '-';
				}
			},
			{
				title: '进度',
				render: (text, record, index) => {
					let progress = [];

					let total = entities[record].total;


					for (let status in total) {
						progress.push({
							status: status,
							num: total[status]
						});
					}

					return (
						<div>
							{
								progress.map((p) => {
									return (<span>{consts.ORDER_STATUS[p.status]}({p.num})</span>);
								})
							}
						</div>
					);
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
					return (
						<div>
							<Link to={'/order/' + entities[record].order_id}>详情</Link>
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
							<button className="ui button primary">下载</button>
						</Col>
					</Row>
				</header>
				<Table className="ui table" columns={columns} dataSource={order.items} rowSelection={rowSelection}></Table>
			</div>
        );
    }
}
