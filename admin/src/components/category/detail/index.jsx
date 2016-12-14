/**
 * 品类详情
 */
import React, { Component } from 'react';
import './style.scss';

export class CategoryDetailComponent extends Component {
	componentWillMount() {
		let {xhttp, params} = this.props;
		xhttp({action: 'detail', api: 'category', params: [params.category_id]});
	}

	render() {
		let {entities, params} = this.props;
		let {category_id} = params;
		let categoryData = entities[category_id];
		console.log(categoryData);
		return (
			<div className="category-detail">
				品类详情
			</div>
		);
	}
}
