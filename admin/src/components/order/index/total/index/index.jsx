/**
 * 订单列表
 */
import React, { Component } from 'react';
import { OrderTotalItemComponent as TotalItem } from '../total_item/';

import './style.scss';

export class OrderTotalComponent extends Component {
    componentWillMount() {
        this.props.xhttp.list('order');
    }

    render() {
        let {entities, order} = this.props;

        return (
            <div className="order-total">
                {order.fetching ? (
                    <div className="loading">加载中</div>
                ) : ''}

                {!order.fetching && order.items.length ? (
                    <ul className="list">
                        {order.items.map((order_id, order_index) => (
                            <TotalItem order={entities[order_id]} key={order_index}></TotalItem>
                        ))}
                    </ul>
                ) : ''}

                {!order.fetching && !order.items.length ? (
                    <div className="nodata">暂无数据</div>
                ) : ''}
            </div>
        );
    }
}