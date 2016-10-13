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

		return (
			<div>
				<header className="list-header">
					<Link className="ui button primary" to="/user/add">添加</Link>
				</header>
				<table className="ui table">
					<thead>
						<th>序号</th>
						<th>账号</th>
						<th>姓名</th>
						<th>电话</th>
						<th>创建时间</th>
						<th>操作</th>
					</thead>
					<tbody>
						{user.items.map((user_id, user_index) => (
							<tr>
								<td>{user_index + 1}</td>
								<td>{entities[user_id].username}</td>
								<td>{entities[user_id].name || '-'}</td>
								<td>{entities[user_id].phone || '-'}</td>
								<td>{moment(entities[user_id].create_time).format('YYYY-MM-DD hh:mm:ss')}</td>
								<td>
									<Link to={'/user/' + user_id + '/edit'}>修改</Link>
									<a href="#">删除</a>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		);
	}
}



