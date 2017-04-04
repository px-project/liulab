/**
 * 订单详情组件
 */
import React from 'react';
import './style.scss';
import { OrderInfo } from '../info/';
import { OrderManifest } from '../manifest/';

export const OrderDetail = ({ order, entities, manifest, params, category, match: { params: { order_id } } }) => (
	<div className="order-detail">
		<h4 className="order-id">{ order_id }</h4>
		<OrderInfo order={ entities[order.detail] }></OrderInfo>
		<OrderManifest entities={ entities } manifest={ manifest }></OrderManifest>
	</div>
)