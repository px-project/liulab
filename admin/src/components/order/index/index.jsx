/**
 * 订单列表组件
 */
import React, {Component} from 'react';
import moment from 'moment';
import {Table} from 'antd';
import {Link} from 'react-router';
import './style.scss';

export class OrderComponent extends Component  {

	componentWillMount () {
		this.props.xhttp({
			action: 'list',
			api: 'order',
			reload: true
		});
	}

    render () {
    	let toggleStatus = {
    		pending: '待审核',
    		pended: '已审核',
    		processing: '订货中',
    		successed: '订货成功',
    		failed: '取消订单'
    	};

    	let toggleStatusFilterArr = [];

		for (let key in toggleStatus) {
			toggleStatusFilterArr.push({
				text: toggleStatus[key],
				value: toggleStatus[key]
			});
		}

		let columns = [
			{
				title: '序号',
				render: (text, record, index) => {
					return index + 1;
				}
			},
			{
				title: '订单号',
				dataIndex: 'order_id'
			},
			{
				title: '产品类型',
				render: (text, record, index) => {
					return (
						<div>
							{
								record.products.map((prod)=> {
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
				dataIndex: 'user_id',
				render: (text, record, index) => {
					return text;
				}
			},
			{
				title: '创建时间',
				dataIndex: 'create_time',
				render: (text, record, index) => {
					return moment(text).format('YYYY-MM-DD hh:mm:ss');
				}
			},
			{
				title: '状态',
				dataIndex: 'status',
				filters: toggleStatusFilterArr,
				render: (text, record, index) => {
					return toggleStatus[text];
				}
			},
			{
				title: '操作',
				render: (text, record, index) => {
					return (
						<div>
							<Link to={'/order/' + record.order_id}>详情</Link>
							<a href="#">审核通过</a>
							<a href="#">取消订单</a>
							<a href="#">已订货</a>
							<a href="#">已到货</a>
						</div>
					);
				}
			}
		];




        return (
			<div>
				<Table columns={columns} dataSource={this.props.order.items}></Table>
			</div>
        );
    }
}
