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
            <div className="order-detail-info sec">
                <h4 className="sec-title">订单信息</h4>
                <div className="info">
                    <p className="map">
                        <span className="title">下单时间</span>
                        <span className="value">{moment(orderDetail.create_time).format('YYYY-MM-DD HH:mm:ss')}</span>
                    </p>
                    <p className="map">
                        <span className="title">下单人</span>
                        <span className="value">{orderDetail.create_user.name || orderDetail.create_user.username}</span>
                    </p>
                    <p className="map">
                        <span className="title">备注</span>
                        <span className="value">{orderDetail.description}</span>
                    </p>
                </div>
            </div>
        );
    }
}