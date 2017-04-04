/**
 * 订单详情订单信息组件
 */
import React from 'react';
import moment from 'moment';
import './style.scss';

export const OrderInfo = ({ order = { create_user: {} } }) => (
    <div className="order-detail-info sec">
        <h4 className="sec-title">订单信息</h4>
        <div className="info">
            <p className="map">
                <span className="title">下单时间</span>
                <span className="value">{ moment(order.create_time).format('YYYY-MM-DD HH:mm:ss') }</span>
            </p>
            <p className="map">
                <span className="title">下单人</span>
                <span className="value">{ order.create_user.name || order.create_user.username || '-' }</span>
            </p>
            <p className="map">
                <span className="title">备注</span>
                <span className="value">{ order.description }</span>
            </p>
        </div>
    </div>
);