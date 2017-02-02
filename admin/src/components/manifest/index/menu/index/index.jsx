/**
 * 货单菜单组件
 */
import React, { Component } from 'react';
import classname from 'classname';
import { ManifestMenuItemComponent as Item } from '../item/';
import { MANIFEST_STATUS } from '../../../../../constants/';
import { Audit } from '../audit';
import { Book } from '../book/';
import { Arrival } from '../arrival/';
import './style.scss';

export class ManifestMenuComponent extends Component {
    render() {
        let {manifest, entities, xhttp} = this.props;

        let audit = [], book = [], arrival = [];

        manifest.selected.forEach(manifest_id => {
            let manifest = entities[manifest_id];
            let {status} = manifest;
            if (status === 'created') audit.push(manifest);
            if (status === 'auditPassed') book.push(manifest);
            if (status === 'booked') arrival.push(manifest);
        });

        return (
            <div className="manifest-menu">
                {audit.length ? (<Audit list={audit} xhttp={xhttp}></Audit>) : ''}
                {book.length ? (<Book list={book} xhttp={xhttp}></Book>) : ''}
                {arrival.length ? (<Arrival list={arrival} xhttp={xhttp}></Arrival>) : ''}
            </div>
        );
    }
}