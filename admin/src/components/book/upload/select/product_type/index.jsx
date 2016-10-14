/**
 * 产品类型组件
 */
import React, {Component} from 'react';
import classname from 'classname';
import {Icon} from 'antd';
import './style.scss';

export class ProductType extends Component {
	handleClick (props, e) {
		let {index,len, selectProductType} = props;
		selectProductType(index, len);
	}

	render () {
		let {selectProductType, productType, bookPageState, index} = this.props;
		let {productTypeIndex} = bookPageState;
		let {name} = productType;

		return (
			<div className={classname({'product-type': true, selected: !!productTypeIndex[index] })}
				onClick={this.handleClick.bind(this, this.props)}>
				<div className="logo">
					<span className="value">{name.charAt(0).toUpperCase()}</span>
					<div className="select-icon"><i className="icon checkmark"></i></div>
				</div>
				<h4 className="name">{name}</h4>
			</div>
		);
	}
}
