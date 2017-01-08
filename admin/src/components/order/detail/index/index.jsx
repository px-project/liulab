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
	}

	render() {
		let {order, manifest} = this.props;
		return (
			<Loader className="order-detail-page page" loading={order.fetching || manifest.fetching} data={order.detail && manifest.items.length}>
				<Info {...this.props}></Info>
				<Manifest {...this.props}></Manifest>
			</Loader>
		);
	}
}

