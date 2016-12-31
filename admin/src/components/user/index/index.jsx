/**
 * 用户列表组件
 */
import React, { Component } from 'react';
import { Link } from 'react-router';
import { Loader, Select } from '../../common/';
import moment from 'moment';
import './style.scss';
import detailUserAvatar from '../../../public/images/default.png';


export class UserComponent extends Component {
	componentWillMount() {
		let {xhttp} = this.props;
		xhttp.list('role', [], {});
		xhttp.list('user', [], {});
	}

	// 角色变动
	roleChange(e) {
		this.props.xhttp.list('user', [], { role: e.target.value });
	}

	render() {
		let {user, entities, role} = this.props;

		return (
			<div className="user-index-page page">
				<header className="list-header">
					<Link className="ui button primary" to="/user/add">添加</Link>

					<Select className="category group" placeholder="所有角色" empty={true}>
						{role.items.map((role_id, role_index) => (
							<option key={role_index} value={role_id}>{entities[role_id].name}</option>
						))}
					</Select>

				</header>

				<Loader loading={user.fetching} data={user.items}>
					<ul>
						{user.items.map((user_id, user_index) => (
							<li key={user_index}>
								<Link to={`/user/${user_id}`}>
									<div className="avatar">
										<img src={entities[user_id].avatar ? `${window.server}/resource/${entities[user_id].avatar}` : detailUserAvatar} />
									</div>
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



