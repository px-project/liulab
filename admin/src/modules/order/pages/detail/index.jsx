/**
 * 订单详情界面
 */
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { OrderDetail } from '../../components';
import { xhttp, Loader } from '../../../common';

class orderDetailPage extends React.Component {

    componentWillMount() {
        let { xhttp, match: { params: { order_id } } } = this.props;

        xhttp.detail('order', [order_id]);
        xhttp.list('manifest', [], { order_id });
        xhttp.list('category', []);
    }

    render() {
        let { order, manifest, category } = this.props;
        return (
            <Loader className="order-detail-page page" loading={ order.fetching.detail || manifest.fetching.list || category.fetching.list }>
                <OrderDetail {...this.props}></OrderDetail>
            </Loader>
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

export const OrderDetailPage = connect(mapStateToProps, mapDispatchToProps)(orderDetailPage);
