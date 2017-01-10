/**
 * 货单详情信息组件
 */
import React, { Component } from 'react';
import moment from 'moment';
import { MANIFEST_STATUS } from '../../../../constants/';
import './style.scss';

export class Info extends Component {
    render() {
        let {manifest, entities} = this.props;
        let manifestDetail = entities[manifest.detail];

        return (
            <div className="manifest-detail-info">
                <div className="manifest-info">
                    <p className="map"><span className="title">货单号</span><span className="value">{manifestDetail.manifest_id}</span></p>
                    <p className="map"><span className="title">订单号</span><span className="value">{manifestDetail.order_id}</span></p>
                    <p className="map"><span className="title">订购时间</span><span className="value">{moment(manifestDetail.create_time).format('YYYY-MM-DD HH:mm:ss')}</span></p>
                    <p className="map"><span className="title">下单人</span><span className="value">{manifestDetail.create_user}</span></p>
                    <p className="map"><span className="title">状态</span><span className="value">{MANIFEST_STATUS[manifestDetail.status].name}</span></p>
                </div>
                <div className="product-info">
                    <p className="map"><span className="title">产品</span><span className="value">{manifestDetail.product.name}</span></p>
                    <p className="map"><span className="title">数量</span><span className="value">{manifestDetail.num}</span></p>
                    <p className="map"><span className="title">单价</span><span className="value">{manifestDetail.product.unit_price}</span></p>
                    <p className="map"><span className="title">品类</span><span className="value">{manifestDetail.product.category.name}</span></p>
                </div>
            </div>
        );
    }
}