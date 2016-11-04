/**
 * 模板详情
 */
import React, { Component } from 'react';
import './style.scss';

export class CategoryDetailComponent extends Component {
	componentWillMount() {
		let {xhttp, params} = this.props;
		let {category_id} = params;
		this.getCategoryDetail(xhttp, category_id);
	}

	render() {
		let {entities, params} = this.props;
		let {category_id} = params;
		let categoryData = entities[category_id];

		return (
			<div className="category-detail">
				{categoryData ? (
					<div>
						<h3>{categoryData.name}</h3>
						{categoryData.category.length && categoryData.category.map((field, field_index) => (
							<div key={field_index}>{field.key}({field.title})</div>
						))}
					</div>
				) : ''}
			</div>
		);
	}

	// 获取模板详情
	getCategoryDetail(xhttp, category_id) {
		xhttp({ action: 'detail', api: 'template', params: [category_id] });
	}
}
