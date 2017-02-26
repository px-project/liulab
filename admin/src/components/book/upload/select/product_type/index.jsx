/**
 * 产品类型组件
 */
import React, { Component } from 'react';
import classname from 'classname';
import { CategoryCover } from '../../../../common/';
import './style.scss';

export class ProductType extends Component {
	render() {
		let {category, selected, toggle} = this.props;

		return (
			<div className={classname({ 'product-type': true, selected })} onClick={toggle.bind(this, category._id)}>
				<CategoryCover className="category-cover" category_id={category._id}></CategoryCover>
				<i className="fa fa-check"></i>
				<h4 className="name">{category.name}</h4>
			</div>
		);
	}
}
