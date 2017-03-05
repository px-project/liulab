/**
 * 用户列表组件
 */
import React, { Component } from 'react';
import { Link } from 'react-router';
import { Loader, FormSelect, UserAvatar } from '../../../common/';
import './style.scss';

export class UserComponent extends Component {

	render() {
		let {user, entities, role} = this.props;

		return (
			<div className="user-index-page page">
				<header className="page-header">
					<Link className="ui button primary" to="/user/add">添加</Link>

					<FormSelect className="category group" placeholder="所有角色" empty="true" value={role.conditions.role_id}>
						{role.items.map((role_id, role_index) => (
							<option key={role_index} value={role_id}>{entities[role_id].name}</option>
						))}
					</FormSelect>

				</header>

				<Loader loading={user.fetching} data={user.items}>
					<ul>
						{user.items.map((user_id, user_index) => (
							<li key={user_index}>
								<Link to={`/user/${user_id}`}>
									<UserAvatar className="avatar" user_id={user_id}></UserAvatar>
									<div className="info">
										<p className="name">{entities[user_id].name}</p>
										<p className="role">{entities[user_id].role_name || '暂无角色'}</p>
									</div>
								</Link>
							</li>
						))}
					</ul>
				</Loader>
			</div>
		);
	}
}



