/**
 * 订单概述列表项目
 */
import React, { Component } from 'react';
import moment from 'moment';
import { Link } from 'react-router';
import { ORDER_STATUS } from '../../../../../constants/order';
import Chart from 'chart.js';

import './style.scss';

export class OrderTotalItemComponent extends Component {

    componentDidMount() {

        let {total} = this.props.order;

        Chart.defaults.global.legend.display = false;
        new Chart(this.refs.chart, {
            type: 'doughnut',
            data: {
                labels: Object.keys(ORDER_STATUS).map(status => ORDER_STATUS[status].name),
                datasets: [
                    {
                        data: Object.keys(ORDER_STATUS).map(status => total[status]),
                        backgroundColor: Object.keys(ORDER_STATUS).map(status => ORDER_STATUS[status].color),
                        fontSize: '20px'

                    }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true
            }
        });
    }

    render() {
        let {order} = this.props;
        return (
            <li className="order-total-item">
                <div className="info">
                    <div className="order-id">{order.order_id}</div>
                    <div className="chart">
                        <canvas ref="chart"></canvas>
                    </div>
                    <div className="user-time">
                        <div className="user">{order.create_user}</div>
                        <div className="create-time">{moment(order.create_time).format('YYYY/MM/DD')}</div>
                    </div>
                    <div className="actions">
                        <Link to={`/order/${order.order_id}`}>详情</Link>
                    </div>
                </div>
            </li>
        );
    }
}