/**
 * 订单列表界面
 */
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { OrderList } from '../../components';
import { xhttp } from '../../../common/actions';

class orderPage extends React.Component {
    componentWillMount() {
        let { xhttp } = this.props;
        xhttp.list('category');
        xhttp.list('order');
    }
    render() {
        return (<OrderList {...this.props}></OrderList>);
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

export const OrderPage = connect(mapStateToProps, mapDispatchToProps)(orderPage);
