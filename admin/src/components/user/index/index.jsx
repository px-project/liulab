/**
 * 用户列表组件
 */
import React, {Component} from 'react';
import {Link} from 'react-router';
import {ListHeader} from '../../common/list_header/';
import {Table} from 'antd';
import moment from 'moment';
import './style.scss';

// User列表头部
const UserTableConfig = [
	{
		title: '序号',
		render: (text,record, index) => {
			return index + 1;
		}
	},
	{
		title: '姓名',
		dataIndex: 'name',
		render: (text, record, index) => {
			return text || '-';
		}
	},
	{
		title: '电话',
		dataIndex: 'phone',
		render: (text, record, index) => {
			return text || '-';
		}
	},
	{title: '账号', dataIndex: 'username'},
	{
		title: '角色',
		dataIndex: 'role_id',
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
		title: '操作',
		dataIndex: '_id',
		render: (text, record, index) => {
			return (
				<div>
					<Link to={'/user/' + text + '/edit'}>修改</Link>
					<a href="#">删除</a>
				</div>
			)
		}
	}
];


export class UserComponent extends Component {
	componentWillMount () {
		this.props.xhttp('list', 'role', [], {}, true);
		this.props.xhttp('list', 'user', [], {}, true);
	}
	render (){
		let {user, entities} = this.props;
		return (
			<div>
				<ListHeader></ListHeader>
				<Table columns={UserTableConfig} dataSource={user.items}></Table>
			</div>
		);
	}
}



