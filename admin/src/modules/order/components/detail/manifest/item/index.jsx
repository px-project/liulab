/**
 * 货单单项组件
 */
import React from 'react';
import { MANIFEST_STATUS } from '../../../../../manifest/constants';
import { Link } from 'react-router';
import './style.scss';

export const Item = ({ manifest, entities }) => (
    <li className="order-detail-manifest-item" style={{ borderLeftColor: MANIFEST_STATUS[manifest.status].color }}>
        <p className="manifest-id">{manifest.manifest_id}</p>
        <p className="category">{entities[manifest.product.category].name}</p>
        <p className="product">{manifest.product.name}</p>
        <p className="unit-price">{manifest.product.unit_price}</p>
        <p className="num">{manifest.num}</p>
        <p className="status">{MANIFEST_STATUS[manifest.status].name}</p>
        <p className="actions"><Link to={'/manifest/' + manifest.manifest_id}>详情</Link></p>
    </li>
);