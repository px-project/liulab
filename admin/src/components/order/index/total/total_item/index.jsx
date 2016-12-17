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
        console.log(this.refs.chart)
        // new Chart(this.refs.chart, {
        //     type: 'doughnut',
        //     data: [1, 2, 3]
        // })
        var myChart = new Chart(this.refs.chart, {
            type: 'bar',
            data: {
                labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
                datasets: [{
                    label: '# of Votes',
                    data: [12, 19, 3, 5, 2, 3],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255,99,132,1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });
    }

    render() {
        let {order} = this.props;
        return (
            <li className="order-total-item">
                <div className="info">
                    <div className="order-id">{order.order_id}</div>
                    <div className="chart" ref="chart"></div>
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


        // return (
        //     <div className="order-total">
        //         {!order.fetching ? (
        //             order.items.length ? (
        //                 <table className="ui table">
        //                     <thead>
        //                         <tr>
        //                             <th>序号</th>
        //                             <th>订单号</th>
        //                             <th>概述</th>
        //                             <th>订货人</th>
        //                             <th>创建时间</th>
        //                             <th>操作</th>
        //                         </tr>
        //                     </thead>

        //                     <tbody>
        //                         {order.items.map((order_id, order_index) => (
        //                             <tr key={order_index}>
        //                                 <td>{order_index + 1}</td>
        //                                 <td>{entities[order_id].order_id}</td>
        //                                 <td className="total">{Object.keys(ORDER_STATUS).map((status, status_index) => (
        //                                     <span className="total-sec" key={status_index}><span className="name">{ORDER_STATUS[status]}</span><span>({entities[order_id].total[status]})</span></span>
        //                                 ))}</td>
        //                                 <td>{entities[order_id].create_user}</td>
        //                                 <td>{moment(entities[order_id].create_time).format('YYYY-MM-DD HH:mm:ss')}</td>
        //                                 <td>
        //                                     <Link to={`/order/${entities[order_id].order_id}`}>详情</Link>
        //                                 </td>
        //                             </tr>
        //                         ))}
        //                     </tbody>
        //                 </table>
        //             ) : (<div className="nodata">暂无数据</div>)
        //         ) : (<div className="loading">加载中</div>)}
        //     </div>
        // );
    }
}