/**
 * 订单详情订单信息组件
 */
import React, { Component } from 'react';
import moment from 'moment';
import './style.scss';

export class OrderDetailInfo extends Component {
    render() {
        let {order, entities} = this.props;
        let orderDetail = entities[order.detail];
        return (
            <div className="order-detail-info">
                <p className="map">
                    <span className="title">订单号</span>
                    <span className="value">{orderDetail.order_id}</span>
                </p>
                <p className="map">
                    <span className="title">下单时间</span>
                    <span className="value">{moment(orderDetail.create_time).format('YYYY-MM-DD HH:mm:ss')}</span>
                </p>
                <p className="map">
                    <span className="title">下单人</span>
                    <span className="value">{orderDetail.create_user}</span>
                </p>
                <p className="map">
                    <span className="title">备注</span>
                    <span className="value">{orderDetail.description}</span>
                </p>
            </div>
        );
    }
}