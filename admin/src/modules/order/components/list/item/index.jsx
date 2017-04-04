/**
 * 订单列表元素组件
 */
import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import Chart from 'chart.js';
import './style.scss';
import { currency } from '../../../../../utils/';
import { MANIFEST_STATUS } from '../../../../manifest/constants';

export class OrderItem extends React.Component {
    componentDidMount() {
        let { manifests = [] } = this.props.order;
        let total = Object.assign({}, ...Object.keys(MANIFEST_STATUS).map(status => ({ [status]: 0 })));
        manifests.forEach(item => total[item.status]++);

        Chart.defaults.global.legend.display = false;
        new Chart(this.refs.chart, {
            type: 'doughnut',
            data: {
                labels: Object.keys(MANIFEST_STATUS).map(status => MANIFEST_STATUS[status].name),
                datasets: [
                    {
                        data: Object.keys(MANIFEST_STATUS).map(status => total[status]),
                        backgroundColor: Object.keys(MANIFEST_STATUS).map(status => MANIFEST_STATUS[status].color),
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
        let { order } = this.props;
        order.create_user = order.create_user || {};
        return (
            <li className="order-item">
                <div className="info">
                    <div className="order-id">{ order.order_id }</div>
                    <div className="chart">
                        <canvas ref="chart"></canvas>
                    </div>
                    <div className="user-time">
                        <div className="user">{ order.create_user.name || order.create_user.user_name || '-' }</div>
                        <div className="create-time">{ moment(order.create_time).format('YYYY/MM/DD') }</div>
                    </div>
                    <div className="actions">
                        <Link to={ `/order/${order.order_id}` }>详情</Link>
                    </div>
                </div>
            </li>
        );
    }
}