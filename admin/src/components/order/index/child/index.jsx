/**
 * 子订单界面
 */
import React, { Component } from 'react';
import { LoaderComponent as Loader } from '../../../common/';
import './style.scss';

export class OrderChildComponent extends Component {
    componentWillMount() {
        let {xhttp} = this.props;
        xhttp.list('childOrder', [], {});
    }
    render() {
        let {childOrder, entities} = this.props;
        return (
            <div className="order-child">
                <Loader loading={childOrder.fetching} data={childOrder.items}>
                    1111
                </Loader>
            </div>
        );
    }
}