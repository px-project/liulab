/**
 * 添加产品界面
 */
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ProductEdit } from '../../components';
import { xhttp } from '../../../common';

class productAddPage extends React.Component {

    render() {
        return (
            <div className="product-add-page page">
                <ProductEdit onSubmit={ this.createProduct.bind(this) }></ProductEdit>
            </div>
        );
    }

    createProduct(data) {
        let { xhttp, history } = this.props;
        xhttp.create('product', [], data).then(result => {
            history.push(`/product/${result._id}`);
        });
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

export const ProductAddPage = connect(mapStateToProps, mapDispatchToProps)(productAddPage);
