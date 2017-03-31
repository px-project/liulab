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
                <ProductEdit></ProductEdit>
            </div>
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

export const ProductAddPage = connect(mapStateToProps, mapDispatchToProps)(productAddPage);
