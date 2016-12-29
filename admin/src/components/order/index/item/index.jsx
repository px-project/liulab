/**
 * 订单列表元素组件
 */
import React, { Component } from 'react';

export class OrderItemComponent extends Component {
    render() {
        let {order} = this.props;
        return (
            <li className="order-item">
                <header>{order.order_id}</header>

            </li>
        );
    }
}