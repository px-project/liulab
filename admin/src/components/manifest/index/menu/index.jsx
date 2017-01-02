/**
 * 货单菜单组件
 */
import React, { Component } from 'react';
import classname from 'classname';
import './style.scss';

export class ManifestMenuComponent extends Component {
    render() {
        let {manifest, entities} = this.props;

        return (
            <div className="manifest-menu">
                <ul>
                    {manifest.selected.map((manifest_id, manifest_index) => (
                        <li key={manifest_index}>
                            <p>{entities[manifest_id].manifest_id}</p>
                        </li>
                    ))}
                </ul>

                <div className="btn-group">
                    <div className="boss">
                        <button className="button ui">审核通过</button>
                        <button className="button ui">审核不通过</button>
                    </div>
                    <div className="manager">
                        <button className="button ui">已订货</button>
                        <button className="button ui">已到货</button>
                    </div>
                </div>
            </div>
        );
    }
}