/**
 * 货单菜单组件
 */
import React from 'react';
import classname from 'classname';
import { MANIFEST_STATUS } from '../../../../constants';
import { Group } from '../group';
import './style.scss';

export const Menu = ({ entities, manifest_selected }) => {
    let list = { created: [], auditPassed: [], booked: [] };

    manifest_selected.forEach(manifest_id => {
        let manifest = entities[manifest_id], { status } = manifest;
        Object.keys(list).forEach(key => {
            if (status === key) list[key].push(manifest);
        });
    });

    return (
        <div className="manifest-menu">
            {Object.keys(list).map((type, index) => (
                <Group key={index} type={type} list={list[type]}></Group>
            ))}
        </div>
    );
}