/**
 * 货单列表界面
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ProductDetailComponent } from '../../components';

class ProductDetailApp extends Component {

    render() {
        return (<ProductDetailComponent {...this.props}></ProductDetailComponent>);
    }

}

function mapStateToProps(state) {
    return state;
}

function mapDispatchToProps(dispatch) {
    return {};
}

export const ProductDetailContainer = connect(mapStateToProps, mapDispatchToProps)(ProductDetailApp);
