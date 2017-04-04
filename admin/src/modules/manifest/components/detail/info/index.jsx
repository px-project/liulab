/**
 * 货单详情信息组件
 */
import React from 'react';
import moment from 'moment';
import { MANIFEST_STATUS } from '../../../constants';
import { Field } from '../../../../common';
import './style.scss';

export const Info = ({ manifestDetail = {} }) => (
    <div className="manifest-detail-info">
        <div className="manifest-info">
            <Field name="货单号">{ manifestDetail.manifest_id }</Field>
            <Field name="订单号">{ manifestDetail.order_id }</Field>
            <Field name="订购时间">{ moment(manifestDetail.create_time).format('YYYY-MM-DD HH:mm:ss') }</Field>
            <Field name="下单人">{ manifestDetail.create_user.name || manifestDetail.create_user || '-' }</Field>
            <Field name="状态">{ MANIFEST_STATUS[manifestDetail.status].name }</Field>
        </div>
        <div className="product-info">
            <Field name="产品">{ manifestDetail.product.name }</Field>
            <Field name="数量">{ manifestDetail.num }</Field>
            <Field name="单价">{ manifestDetail.product.unit_price }</Field>
            <Field name="品类">{ manifestDetail.product.category.name }</Field>
        </div>
    </div>
);