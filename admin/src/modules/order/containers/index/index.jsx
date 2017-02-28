/**
 * 订单列表界面
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../../../actions';
import { OrderComponent } from '../../components';

class OrderApp extends Component {

    render() {
        return (<OrderComponent {...this.props}></OrderComponent>);
    }

}

function mapStateToProps(state) {
    return state;
}

function mapDispatchToProps(dispatch) {
    let result = {};
    Object.keys(actions).forEach(key => {
        if (typeof actions[key] === 'function') return result[key] = bindActionCreators(actions[key], dispatch);
        result[key] = bindActionCreators(
            Object.assign({}, ...Object.keys(actions[key]).map(ck => ({ [ck]: actions[key][ck] })))
            , dispatch
        );
    });
    return result;
}

export const OrderContainer = connect(mapStateToProps, mapDispatchToProps)(OrderApp);
