/**
 * 订单详情组件
 */
import React, { Component } from 'react';
import './style.scss';
import { OrderDetailInfo as Info } from '../info/';
import { OrderDetailManifest as Manifest } from '../manifest/';
import { Loader } from '../../../common/';

export class OrderDetailComponent extends Component {
	componentWillMount() {
		let {xhttp, params} = this.props;
		let {order_id} = params;

		xhttp.detail('order', [order_id]);
		xhttp.list('manifest', [], { order_id });
		xhttp.list('category', []);
	}

	render() {
		let {order, manifest, params, category} = this.props;
		return (
			<Loader className="order-detail-page page" loading={order.fetching || manifest.fetching || category.fetching} data={order.detail && manifest.items.length}>
				<h4 className="order-id">{params.order_id}</h4>
				<Info {...this.props}></Info>
				<Manifest {...this.props}></Manifest>
			</Loader>
		);
	}
}

