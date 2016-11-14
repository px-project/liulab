/**
 * 用户列表组件
 */
import React, { Component } from 'react';
import { Link } from 'react-router';
import moment from 'moment';
import './style.scss';
import detailUserAvatar from '../../../public/images/huluwa.jpg';


export class UserComponent extends Component {
	componentWillMount() {
		this.props.xhttp({
			api: 'role',
			reload: true
		});

		this.props.xhttp({
			api: 'user',
			reload: true
		});
	}

	render() {
		let {user, entities} = this.props;

		return (
			<div className="user-index-page page">
				<header className="list-header">
					<Link className="ui button primary" to="/user/add">添加</Link>
				</header>

				{!user.fetching && user.items.length ? (
					<div className="list">
						<ul>
							{user.items.map((user_id, user_index) => (
								<li key={user_index}>
									<Link to={`/user/${user_id}`}>
										<div className="avatar">
											<img src={entities[user_id].avatar || detailUserAvatar} />
										</div>
										<div className="info">
											<p className="name">{entities[user_id].name}</p>
											<p className="describe">{entities[user_id].describe || '暂无描述'}</p>
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



