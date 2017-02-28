/**
 * 订单详情界面
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { OrderDetailComponent } from '../../components';

class OrderDetailApp extends Component {

    render() {
        return (<OrderDetailComponent {...this.props}></OrderDetailComponent>);
    }

}

function mapStateToProps(state) {
    return state;
}

function mapDispatchToProps(dispatch) {
    return {};
}

export const OrderDetailContainer = connect(mapStateToProps, mapDispatchToProps)(OrderDetailApp);
