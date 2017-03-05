/**
 * 订单列表界面
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { OrderComponent } from '../../components';

class OrderApp extends Component {
    componentWillMount() {
        let { xhttp } = this.props;
        xhttp.list('category');
        xhttp.list('order');
    }
    render() {
        return (<OrderComponent {...this.props}></OrderComponent>);
    }

}

function mapStateToProps(state) {
    return state;
}

function mapDispatchToProps(dispatch) {
    return {};
}

export const OrderContainer = connect(mapStateToProps, mapDispatchToProps)(OrderApp);
