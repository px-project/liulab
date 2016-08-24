/**
 * 用户列表组件
 */
import React, {Component} from 'react';
import {ListHeader} from '../../common/list_header/';
import {Table} from 'antd';
import moment from 'moment';

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
	{title: '操作', }
];


export class UserList extends Component {
	componentWillMount () {
		this.props.getRoleList();
		this.props.getUserList();
	}
	render (){
		let {userList, roleList} = this.props;
		return (
			<div>
				<ListHeader></ListHeader>
				<Table columns={UserTableConfig} dataSource={userList}></Table>
			</div>
		);
	}
}



