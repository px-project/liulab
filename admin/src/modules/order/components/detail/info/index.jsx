/**
 * 订单详情订单信息组件
 */
import React from 'react';
import moment from 'moment';
import { Field } from '../../../../common';
import './style.scss';

export const OrderInfo = ({ order = { create_user: {} } }) => (
    <div className="order-detail-info sec">
        <h4 className="sec-title">订单信息</h4>
        <div className="info">
            <Field name="下单时间">{ moment(order.create_time).format('YYYY-MM-DD HH:mm:ss') }</Field>
            <Field name="下单人">{ order.create_user.name || order.create_user.username || '-' }</Field>
            <Field name="备注">{ order.description || '-' }</Field>
        </div>
    </div>
);