/**
 * 订单列表元素组件
 */
import React, { Component } from 'react';
import { Link } from 'react-router';
import moment from 'moment';
import './style.scss';
import { currency } from '../../../../utils/';

export class OrderItemComponent extends Component {
    render() {
        let {entities, category} = this.props;
        return (
            <li className="order-item">
                order items.
            </li>
        );
    }
}