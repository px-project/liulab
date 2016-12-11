/**
 * 订单列表
 */
import React, { Component } from 'react';
import moment from 'moment';
import { Link } from 'react-router';
import {ORDER_STATUS} from '../../../../constants/order';

import './style.scss';

export class OrderTotalComponent extends Component {
    componentWillMount() {
        this.props.xhttp({ action: 'list', api: 'order' });
    }

    render() {
        let {entities, order} = this.props;
        return (
            <div className="order-total">
                {!order.fetching ? (
                    order.items.length ? (
                        <table className="ui table">
                            <thead>
                                <tr>
                                    <th>序号</th>
                                    <th>订单号</th>
                                    <th>概述</th>
                                    <th>订货人</th>
                                    <th>创建时间</th>
                                    <th>操作</th>
                                </tr>
                            </thead>

                            <tbody>
                                {order.items.map((order_id, order_index) => (
                                    <tr key={order_index}>
                                        <td>{order_index + 1}</td>
                                        <td>{entities[order_id].order_id}</td>
                                        <td className="total">{Object.keys(ORDER_STATUS).map((status, status_index) => (
                                            <span className="total-sec" key={status_index}><span className="name">{ORDER_STATUS[status]}</span><span>({entities[order_id].total[status]})</span></span>
                                        ))}</td>
                                        <td>{entities[order_id].create_user}</td>
                                        <td>{moment(entities[order_id].create_time).format('YYYY-MM-DD HH:mm:ss')}</td>
                                        <td>
                                            <Link to={`/order/${entities[order_id].order_id}`}>详情</Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (<div className="nodata">暂无数据</div>)
                ) : (<div className="loading">加载中</div>)}
            </div>
        );
    }
}