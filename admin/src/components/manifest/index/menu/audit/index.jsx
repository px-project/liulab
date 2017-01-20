/**
 * 审核组件
 */
import React, { Component } from 'react';
import { MANIFEST_STATUS } from '../../../../../constants/';
import { ManifestMenuItemComponent as Item } from '../item/';
import './style.scss';

export class Audit extends Component {
    render() {
        let {list} = this.props;
        return (
            <div className="manifest-menu-audit menu-sec">
                <header>
                    <h3 >未审核货单</h3>
                    <div className="actions">
                        <button className="ui button green mini">通过</button>
                        <button className="ui button red mini">不通过</button>
                    </div>
                </header>

                <ul>
                    {list.map((item, index) => (
                        <Item manifest={item} key={index}></Item>
                    ))}
                </ul>
            </div>
        );
    }
}

