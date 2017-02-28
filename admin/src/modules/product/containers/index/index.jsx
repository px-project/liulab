/**
 * 产品列表界面
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ProductComponent } from '../../components';

class ProductApp extends Component {

    render() {
        return (<ProductComponent {...this.props}></ProductComponent>);
    }

}

function mapStateToProps(state) {
    return state;
}

function mapDispatchToProps(dispatch) {
    return {};
}

export const ProductContainer = connect(mapStateToProps, mapDispatchToProps)(ProductApp);
