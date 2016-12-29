/**
 * 订单首页
 */
import React, { Component } from 'react';
import { Link } from 'react-router';
import classname from 'classname';
import './style.scss';
import routes from '../../../../config/routes.json';
import { SelectComponent as Select } from '../../../common/';


export class OrderComponent extends Component {
    componentWillMount() {
        this.getOrderList();
        this.props.xhttp.list('category', [], {});
    }

    render() {
        let {category, entities} = this.props;
        return (
            <div className="page order-index-page">
                <header className="list-header">
                    <Select className="category group" empty={true} placeholder="所有品类" change={this.getOrderList.bind(this)}>
                        {category.items.map((category_id, category_index) => (
                            <option key={category_index} value={category_id}>{entities[category_id].name}</option>
                        ))}
                    </Select>
                </header>
            </div>
        );
    }

    // 获取订单列表
    getOrderList(conditions = {}) {
        this.props.xhttp.list('order', [], conditions);
    }
}

