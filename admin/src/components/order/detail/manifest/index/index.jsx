/**
 * 订单详情运单组件
 */
import React, { Component } from 'react';
import { Item } from '../item/';
import './style.scss';

export class OrderDetailManifest extends Component {
    render() {
        return (
            <div className="order-detail-manifest">
                manifest
                <ul>
                    <Item></Item>
                </ul>
            </div>
        )
    }
}
