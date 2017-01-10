/**
 * 审核组件
 */
import React, { Component } from 'react';
import { MANIFEST_STATUS } from '../../../../../constants/';
import './style.scss';

export class Audit extends Component {
    render() {
        let {list} = this.props;
        return (
            <div className="manifest-menu-audit menu-sec">
                <header>
                    <h3 style={{ color: MANIFEST_STATUS.created.color }}><i className="fa fa-ellipsis-h"></i>未审核货单</h3>
                    <div className="actions">
                        <a style={{ color: MANIFEST_STATUS.auditPassed.color }}>通过</a>
                        <a style={{ color: MANIFEST_STATUS.auditFailed.color }}>不通过</a>
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

