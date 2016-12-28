/**
 * 用户列表组件
 */
import React, { Component } from 'react';
import { Link } from 'react-router';
import moment from 'moment';
import './style.scss';
import detailUserAvatar from '../../../public/images/default.png';


export class UserComponent extends Component {
	componentWillMount() {
		let {xhttp} = this.props;
		xhttp.list('role', [], {});
		xhttp.list('user', [], {});
	}

	componentDidMount() {
		$(this.refs.dropdown).dropdown();
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

					<div className="group">
						<select className="ui select dropdown" onChange={this.roleChange.bind(this)} ref="dropdown">
							<option value="">所有角色</option>
							{!role.fetching ? role.items.map((role_id, index) => (
								<option key={index} value={role_id}>{entities[role_id].name}</option>
							)) : ''}
						</select>
					</div>
				</header>

				{!user.fetching && user.items.length ? (
					<div className="list">
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
					</div>
				) : ''}
			</div>
		);
	}
}



