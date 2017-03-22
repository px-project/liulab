/**
 * 订单详情运单组件
 */
import React, { Component } from 'react';
import { Item } from '../item/';
import './style.scss';

export const OrderManifest = ({ manifest, entities }) => (
    <div className="order-detail-manifest sec">
        <h4 className="sec-title">货单详情</h4>
        <ul>
            <li>
                <p className="manifest-id">货单号</p>
                <p className="category">品类</p>
                <p className="product">产品</p>
                <p className="unit-price">单价</p>
                <p className="num">数量</p>
                <p className="status">状态</p>
            </li>
            {manifest.items.map((manifest_id, manifest_index) => (
                <Item manifest={entities[manifest_id]} key={manifest_index} entities={entities}></Item>
            ))}
        </ul>
    </div>
);