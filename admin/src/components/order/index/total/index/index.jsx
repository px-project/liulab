/**
 * 订单列表
 */
import React, { Component } from 'react';
import { OrderTotalItemComponent as TotalItem } from '../total_item/';
import { LoaderComponent as Loader } from '../../../../common/';

import './style.scss';

export class OrderTotalComponent extends Component {
    componentWillMount() {
        this.props.xhttp.list('order');
    }

    render() {
        let {entities, order} = this.props;

        return (
            <div className="order-total">
                <Loader loading={order.fetching} data={order.items}>
                    <ul>
                        {order.items.map((order_id, order_index) => (
                            <TotalItem order={entities[order_id]} key={order_index}></TotalItem>
                        ))}
                    </ul>
                </Loader>
            </div>
        );
    }
}