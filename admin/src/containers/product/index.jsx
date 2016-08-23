/**
 * 产品模块容器
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchProductList} from '../../actions/product/';
import {ProductList} from '../../components/product/list/';

class ProductContainer extends Component {
	render () {
		return (
			<div>
				<ProductList {...this.props}></ProductList>
			</div>
		);
	}
}

// 状态
function mapStateToProps (states) {
	return states;
}


// 行为
function mapDispatchToProps (dispatch) {
	return bindActionCreators({
		fetchProductList
	}, dispatch);
}

export const ProductApp = connect(mapStateToProps, mapDispatchToProps)(ProductContainer);
