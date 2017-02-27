/**
 * 货单菜单组件
 */
import React, { Component } from 'react';
import classname from 'classname';
import { MANIFEST_STATUS } from '../../../../../../constants/';
import './style.scss';
import { ManifestMenuGroupComponent as Group } from '../group';

export class ManifestMenuComponent extends Component {
    render() {
        let {manifest, entities, xhttp} = this.props;

        let list = { created: [], auditPassed: [], booked: [] };

        manifest.selected.forEach(manifest_id => {
            let manifest = entities[manifest_id], {status} = manifest;
            Object.keys(list).forEach(key => {
                if (status === key) list[key].push(manifest);
            });
        });

        return (
            <div className="manifest-menu">
                {Object.keys(list).map((type, index) => (
                    <Group key={index} type={type} list={list[type]} xhttp={xhttp}></Group>
                ))}
            </div>
        );
    }
}