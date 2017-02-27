/**
 * 侧边栏单项组件
 */
import React, { Component } from 'react';
import './style.scss';

export class ManifestMenuItemComponent extends Component {
    render() {
        let {manifest} = this.props;
        return (
            <li className="manifest-menu-item">
                <p className="manifest-id">{manifest.manifest_id}</p>
                <div className="info">
                    <p className="product">{manifest.product.name}({manifest.product.code})</p>
                    <p className="num">{manifest.num}</p>
                </div>
            </li>
        );
    }
}