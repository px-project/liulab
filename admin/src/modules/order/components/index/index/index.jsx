/**
 * 订单首页
 */
import React, { Component } from 'react';
import { Link } from 'react-router';
import classname from 'classname';
import { Select, Loader, Search } from '../../../../common/';
import { OrderItemComponent as Item } from '../item/';
import './style.scss';


export class OrderComponent extends Component {
    componentWillMount() {
        this.getOrderList();
        this.getCategoryList();
    }

    render() {
        let {category, order, entities} = this.props;
        return (
            <div className="page order-page">
                <header className="page-header">
                    <Select className="group" placeholder="所有品类" empty={true}></Select>
                    <Search></Search>
                </header>

                <Loader loading={order.fetching} data={order.items}>
                    <ul>
                        {order.items.map((order_id, order_index) => (
                            <Item key={order_index} order={entities[order_id]}></Item>
                        ))}
                    </ul>
                </Loader>
            </div>
        );
    }

    // 获取品类列表
    getCategoryList(conditions = {}) {
        return this.props.xhttp.list('category', [], conditions);
    }

    // 获取订单列表
    getOrderList(conditions = {}) {
        return this.props.xhttp.list('order', [], conditions);
    }
}

