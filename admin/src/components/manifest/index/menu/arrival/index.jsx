/**
 * 到货组件
 */
import React, { Component } from 'react';
import { MANIFEST_STATUS } from '../../../../../constants/';
import './style.scss';

export class Arrival extends Component {
    render() {
        let {list, xhttp} = this.props;
        return (
            <div className="manifest-menu-arrival menu-sec">
                <header>
                    <h3 style={{ color: MANIFEST_STATUS.booked.color }}><i className="fa fa-ellipsis-h"></i>未到货货单</h3>
                    <div className="actions">
                        <a style={{ color: MANIFEST_STATUS.arrivaled.color }}>已到货</a>
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