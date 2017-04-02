/**
 * 编辑产品界面
 */
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ProductEdit } from '../../components';
import { xhttp, Loader } from '../../../common';
import { initialize } from 'redux-form';

class productEditPage extends React.Component {

    render() {
        let { xhttp, product } = this.props;
        return (
            <Loader className="product-edit-page page" loading={ product.fetching.detail }>
                <ProductEdit onSubmit={ this.updateProduct.bind(this) }></ProductEdit>
            </Loader>
        );
    }

    updateProduct(data) {
        let { xhttp, product, history } = this.props;
        xhttp.update('product', [data._id], data).then(result => {
            history.push(`/product/${data._id}`);
        });
    }

}

function mapStateToProps(state) {
    return state;
}

function mapDispatchToProps(dispatch) {
    return {
        xhttp: xhttp(dispatch),
        initialize: bindActionCreators(initialize, dispatch)
    };
}

export const ProductEditPage = connect(mapStateToProps, mapDispatchToProps)(productEditPage);
