/**
 * 订单首页
 */
import React from 'react';
import { Link } from 'react-router-dom';
import { Select, Loader, Search } from '../../../../common/';
import { OrderItem } from '../item/';
import { FormSelect } from 'semantic-ui-react';
import './style.scss';

export const OrderList = ({ category, order, entities }) => (
    <div className="page order-page">
        <header className="page-header">
            <FormSelect placeholder="所有品类" className="group"
                options={category.items.map((category_id, index) => {
                    let category = entities[category_id];
                    return { key: index, value: category_id, text: category.name };
                })}
            ></FormSelect>
            <Search></Search>
        </header>

        <Loader loading={order.fetching.list} data={order.items}>
            <ul>
                {order.items.map((order_id, order_index) => (
                    <OrderItem key={order_index} order={entities[order_id]}></OrderItem>
                ))}
            </ul>
        </Loader>
    </div>
);
