/**
 * 订购
 */
import React, { Component } from 'react';
import { MANIFEST_STATUS } from '../../../../../constants/';
import './style.scss';

export class Book extends Component {
    render() {
        let {list} = this.props;
        return (
            <div className="manifest-menu-book menu-sec">
                <header>
                    <h3 style={{ color: MANIFEST_STATUS.auditPassed.color }}><i className="fa fa-ellipsis-h"></i>审核通过订单</h3>
                    <div className="actions">
                        <a style={{ color: MANIFEST_STATUS.booked.color }}>已订购</a>
                    </div>
                </header>
                <ul>
                    {list.map((item, index) => (
                        <li key={index}>
                            {item.manifest_id}
                            <p className="manifest-id">{item.manifest}</p>
                            <div>
                                <p>{item.product.name}({item.product.code})</p>
                                <p>{item.num}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}