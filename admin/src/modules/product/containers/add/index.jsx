/**
 * 添加产品界面
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ProductAddComponent } from '../../components';

class ProductAddApp extends Component {

    render() {
        return (<ProductAddComponent {...this.props}></ProductAddComponent>);
    }

}

function mapStateToProps(state) {
    return state;
}

function mapDispatchToProps(dispatch) {
    return {};
}

export const ProductAddContaner = connect(mapStateToProps, mapDispatchToProps)(ProductAddApp);
