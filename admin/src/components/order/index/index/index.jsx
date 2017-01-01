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
import { OrderMenuComponent as OrderMenu } from '../menu/';


export class OrderComponent extends Component {
    componentWillMount() {
        this.props.xhttp.list('category', [], {});
    }

    render() {
        let {category, childOrder, entities} = this.props;
        return (
            <div className="page order-index-page">
                menu list
            </div>
        );
    }
}

