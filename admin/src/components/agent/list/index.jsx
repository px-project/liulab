/**
 * 代理商列表组件
 */
import React, {Component} from 'react';
import {ListHeader} from '../../common/list_header/';
import {Table} from 'antd';
import moment from 'moment';


// 代理商表格配置
const AgentConifg = [
	{
		title: '序号',
		render: (text, record, index) => {
			return index + 1;
		}
	},
	{
		title: '名称',
		dataIndex: 'name',
	},
	{
		title: '联系人',
		dataIndex: 'linkman'
	},
	{
		title: '电话',
		dataIndex: 'phone'
	},
	{
		title: '创建时间',
		dataIndex: 'create_time',
		render: (text, record, index) => {
			return moment(text).format('YYYY-MM-DD hh:mm:ss');
		}
	},
	{
		title: '操作',
	}
];

export class AgentList extends Component {
	componentWillMount () {
		this.props.getAgentList();
	}
	render () {
		let {agentList} = this.props;
		return (
			<div>
				<ListHeader></ListHeader>
				<Table columns={AgentConifg} dataSource={agentList}></Table>
			</div>
		);
	}
}
