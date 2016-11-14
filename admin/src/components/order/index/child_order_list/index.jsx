/**
 * 子订单列表
 */
import React, { Component } from 'react'; 
import * as consts from '../../../../constants/';
import './style.scss';

export class ChildOrderListComponent extends Component {
    componentWillMount() {
        this.getChildOrderList();
    }

    render() {
        let {order, entities} = this.props;
        return (
            <div className="child-order-list">
                {!order.fetching && order.items.length ? (
                    <table className="ui table">
                        <thead>
                            <tr>
                                <th><input type="checkbox" /></th>
                                <th>订单号</th>
                                <th>货号</th>
                                <th>名称</th>
                                <th>单价</th>
                                <th>数量</th>
                                <th>合计</th>
                                <th>状态</th>
                                <th>操作</th>
                            </tr>
                        </thead>

                        <tbody>
                            {order.items.map((order_id, order_index) => (
                                <tr key={order_index}>
                                    <td><input type="checkbox" /></td>
                                    <td>{entities[order_id].order_id}</td>
                                    <td>{entities[order_id].product.code}</td>
                                    <td>{entities[order_id].product.name}</td>
                                    <td>{entities[order_id].product.unit_price}</td>
                                    <td>{entities[order_id].product.num}</td>
                                    <td>{entities[order_id].product.num * entities[order_id].product.unit_price}</td>
                                    <td>{consts.ORDER_STATUS[entities[order_id].status]}</td>
                                    <td></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                        <div className="no-data">暂无数据</div>
                    )}
            </div>
        );
    }


    // 获取子订单列表
    getChildOrderList(conditions = {}) {
        conditions.order_type = 'child_order';
        this.props.xhttp({ action: 'list', api: 'order', conditions, reload: true }, (result) => { });
    }
}