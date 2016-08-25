/**
 * 产品模块容器
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';


class ProductContainer extends Component {
	render () {
		return (
			<h1>Product</h1>
		);
	}
}

export const ProductApp = connect()(ProductContainer);
