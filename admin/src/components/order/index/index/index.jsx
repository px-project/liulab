/**
 * 订单首页
 */
import React, { Component } from 'react';
import { Link } from 'react-router';
import classname from 'classname';
import './style.scss';
import routes from '../../../../config/routes.json';
import { Select, Loader, Search } from '../../../common/';
import { OrderItemComponent as OrderItem } from '../item/';


export class OrderComponent extends Component {
    componentWillMount() {
        this.getOrderList();
        this.props.xhttp.list('category', [], {});
    }

    render() {
        let {category, order, entities} = this.props;
        return (
            <div className="page order-index-page">
                <header className="list-header">
                    
                    <Select className="category group" empty={true} placeholder="所有品类" change={this.getOrderList.bind(this)}>
                        {category.items.map((category_id, category_index) => (
                            <option key={category_index} value={category_id}>{entities[category_id].name}</option>
                        ))}
                    </Select>
                    <Select className="status group" placeholder="所有状态" empty={true}></Select>
                    <Search></Search>
                </header>

                <Loader loading={order.fetching} data={order.items}>
                    <ul>
                        {order.items.map((order_id, order_index) => (
                            <OrderItem key={order_index} order={entities[order_id]}></OrderItem>
                        ))}
                    </ul>
                </Loader>
            </div>
        );
    }

    // 获取订单列表
    getOrderList(conditions = {}) {
        this.props.xhttp.list('order', [], conditions);
    }
}

