/**
 * 编辑产品界面
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ProductEditComponent } from '../../components';

class ProductEditApp extends Component {

    render() {
        return (<ProductEditComponent {...this.props}></ProductEditComponent>);
    }

}

function mapStateToProps(state) {
    return state;
}

function mapDispatchToProps(dispatch) {
    return {};
}

export const ProductEditContainer = connect(mapStateToProps, mapDispatchToProps)(ProductEditApp);
