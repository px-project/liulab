/**
 * 货单菜单组件
 */
import React, { Component } from 'react';
import classname from 'classname';
import { MANIFEST_STATUS } from '../../../../../constants/';
import './style.scss';
import { ManifestMenuGroupComponent as Group } from '../group';

export class ManifestMenuComponent extends Component {
    render() {
        let {manifest, entities, xhttp} = this.props;

        let list = { audit: [], book: [], arrival: [] };

        manifest.selected.forEach(manifest_id => {
            let manifest = entities[manifest_id], {status} = manifest;
            if (status === 'created') list.audit.push(manifest);
            if (status === 'auditPassed') list.book.push(manifest);
            if (status === 'booked') list.arrival.push(manifest);
        });

        return (
            <div className="manifest-menu">
                {['audit', 'book', 'arrival'].map((type, index) => (
                    <Group key={index} type={type} list={list[type]} xhttp={xhttp}></Group>
                ))}
            </div>
        );
    }
}