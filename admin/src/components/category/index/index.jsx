/**
 * 品类列表组件
 */
import React, { Component } from 'react';
import moment from 'moment';
import { Link } from 'react-router';
import * as consts from '../../../constants/';
import defaultPhoto from '../../../public/images/huluwa.jpg';
import './style.scss';

export class CategoryComponent extends Component {

	componentWillMount() {
		this.props.xhttp({
			action: 'list',
			api: 'category',
			reload: true
		});
	}

	render() {
		let {entities, category} = this.props;

		return (
			<div className="category-list-page page">
				<header className="list-header">
					<Link className="ui button primary" to="/category/add">添加</Link>
				</header>
				<div className="list">
					{!category.fetching ? (
						<ul>
							{category.items.map((category_id, category_index) => (
								<li key={category_index}>
									<Link to={'/category/' + category_id}>
										<div className="photo">
											<img src={entities[category_id].photo ? `${window.server}/resource/${entities[category_id].photo}` : defaultPhoto} />
										</div>
										<div className="info">
											<div className="name">{entities[category_id].name}</div>
											<div className="description">{entities[category_id].description}</div>
										</div>
									</Link>
								</li>
							))}
						</ul>
					) : ''}
				</div>
			</div>
		);
	}
}
