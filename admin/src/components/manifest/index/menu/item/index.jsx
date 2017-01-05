/**
 * 侧边栏单项组件
 */
import React, { Component } from 'react';
import './style.scss';

export class ManifestMenuItemComponent extends Component {
    render() {
        let {manifest} = this.props;
        return (
            <div className="manifest-menu-item">
                {manifest.manifest_id}
                <p className="manifest-id">{manifest.manifest}</p>
                <div>
                    <p>{manifest.product.name}({manifest.product.code})</p>
                    <p>{manifest.num}</p>
                </div>
            </div>
        );
    }
}