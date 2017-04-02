/**
 * 货单列表界面
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ProductDetail } from '../../components';
import { xhttp, Loader } from '../../../common';

class productDetailPage extends React.Component {
    componentWillMount() {
        let { match, product, xhttp } = this.props;
        const { product_id } = match.params;
        if (product_id !== product.detail) {
            xhttp.detail('product', [product_id]);
        }
    }

    render() {
        const { xhttp, product, entities } = this.props;
        const productDetail = entities[product.detail];
        return (
            <Loader className="product-detail-page page" loading={ product.fetching.detail } data={ productDetail }>
                <ProductDetail {...this.props} productDetail={ productDetail }></ProductDetail>
            </Loader>
        );
    }

}

function mapStateToProps(state) {
    return state;
}

function mapDispatchToProps(dispatch) {
    return {
        xhttp: xhttp(dispatch)
    };
}

export const ProductDetailPage = connect(mapStateToProps, mapDispatchToProps)(productDetailPage);
