/**
 * 产品类型组件
 */
import React, { Component } from 'react';
import classname from 'classname';
import './style.scss';

export class ProductType extends Component {
	render() {
		let {category, selected, toggle} = this.props;

		return (
			<div className={classname({ 'product-type': true, selected })}
				onClick={toggle.bind(this, category._id)}>
				<div className="logo">
					{/*<Image src={`${window.server}/resource/${category.photo}`}></Image>*/}
				</div>
				<i className="fa fa-check"></i>

				<h4 className="name">{category.name}</h4>
			</div>
		);
	}
}
