/**
 * 代理商详情组件
 */
import React, {Component} from 'react';
import {Link} from 'react-router';
import './style.scss';
import {Table, Button} from 'antd';


const agentTableConfig = [
	{
		title: "序号",
		render: (text, record, index) => {
			return index + 1;
		}
	},
	{
		title: "名称",
		dataIndex: "name"
	},
	{
		title: '货号',
		dataIndex: '_id'
	},
	{
		title: '价格',
		dataIndex: 'price'
	},
	{
		title: '规格',
		dataIndex: 'specification'
	},
	{
		title: '厂家',
		dataIndex: 'vender'
	},
	{
		title: '操作',
		render: (text, record, index) => {
			return (
				<div>
					<a href="#">修改</a>
					<a href="#">删除</a>
				</div>
			);
		}
	}
];


export class AgentDetailComponent extends Component {
    componentWillMount () {
        this.props.xhttp({
			action: 'detail',
			api: 'agent',
			params: [this.props.params.agent_id],
			reload: true
		});
    }
    render () {
    	let currentAgent = this.props.agent.items[this.props.agent.detailIndex] || {};
    	return (
			<div className="detail">
				<header>
					<h2 className="name">{currentAgent.name}</h2>
					{
						currentAgent.phone ?
						<p className="phone">
							<i className="icon fa fa-phone"></i>{currentAgent.phone || ''} {currentAgent.linkman ? `(${currentAgent.linkman})` : ''}
						</p>: ''
					}
					{
						currentAgent.address ?
						<p className="address">
							<i className="icon fa fa-location-arrow"></i>{currentAgent.address}
						</p>: ''
					}
					<p>
						<a href="#"><i className="icon fa fa-edit"></i></a>
					</p>
				</header>

				<div className="product-list">
					<header>
						<Button type="primary">添加</Button>
					</header>
					{
						(currentAgent.products || []).length ?
							<Table columns={agentTableConfig} dataSource={currentAgent.products}></Table>: ''
					}
				</div>
			</div>
    	);
    }
}
