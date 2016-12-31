/**
 * 订单列表元素组件
 */
import React, { Component } from 'react';
import { Link } from 'react-router';
import './style.scss';

export class OrderItemComponent extends Component {
    render() {
        let {order} = this.props;
        return (
            <li className="order-item">
                <header className="header">
                    <p className="order-id">{order.order_id}</p>
                    <p className="user">{order.create_user}</p>
                    <div className="actions">
                        <Link to={'/order/' + order.order_id} className="ui button mini">详情</Link>
                    </div>
                </header>

                <div className="list">
                    <ul>
                        {order.child_orders.map((child_order, child_order_index) => (
                            <li key={child_order_index}>

                            </li>
                        ))}
                    </ul>
                </div>
            </li>
        );
    }
}