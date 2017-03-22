/**
 * 订单详情组件
 */
import React from 'react';
import './style.scss';
import { OrderInfo } from '../info/';
import { OrderManifest } from '../manifest/';
import { Loader } from '../../../../common/';

export const OrderDetail = ({ order, entities, manifest, params, category, match: { params: { order_id } } }) => (
	<Loader className="order-detail-page page" loading={order.fetching.detail || manifest.fetching.list || category.fetching.list} data={order.detail}>
		<h4 className="order-id">{order_id}</h4>
		<OrderInfo orderDetail={entities[order.detail] || {}}></OrderInfo>
		<OrderManifest entities={entities} manifest={manifest}></OrderManifest>
	</Loader>
)