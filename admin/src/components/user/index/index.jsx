/**
 * 用户列表组件
 */
import React, {Component} from 'react';
import {Link} from 'react-router';
import {Table, Row, Col, Button} from 'antd';
import moment from 'moment';
import './style.scss';


export class UserComponent extends Component {
	componentWillMount () {
		this.props.xhttp({
			api: 'role',
			reload: true
		});

		this.props.xhttp({
			api: 'user',
			reload: true
		});
	}

	render (){
		let {user, entities} = this.props;


		let columns = [
			{
				title: '序号',
				key: 'index',
				render: (text,record, index) => {
					return index + 1;
				}
			},
			{
				title: '姓名',
				key: 'name',
				render: (text, record, index) => {
					return entities[record].name || '-';
				}
			},
			{
				title: '电话',
				key: 'phone',
				render: (text, record, index) => {
					return entities[record].phone || '-';
				}
			},
			{
				title: '账号',
				key: 'username',
				render: (text, record, index) => {
					return entities[record].username || '-';
				}
			},
			{
				title: '角色',
				key: 'role',
				render: (text, record, index) => {
					// return entities[entities[record].role_id].name || '-';
					return '-';
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
							<Link to={'/user/' + record + '/edit'}>修改</Link>
							<a href="#">删除</a>
						</div>
					)
				}
			}
		];
		return (
			<div>
				<header className="list-header">
					<div>
						<Link className="ui button primary" to="/user/add">添加</Link>
					</div>
				</header>
				<Table columns={columns} dataSource={user.items}></Table>
			</div>
		);
	}
}



