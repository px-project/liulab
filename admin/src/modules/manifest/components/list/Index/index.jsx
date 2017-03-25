/**
 * 货单列表界面
 */
import React from 'react';
import { Item } from '../item/';
import { Menu } from '../menu/';
import { Search, Loader } from '../../../../common/';
import { FormSelect } from 'semantic-ui-react';
import { MANIFEST_STATUS } from '../../../constants';
import './style.scss';

export const ManifestList = ({ manifest, entities, category, selectManifest, manifest_selected }) => (
    <div className="page manifest-page">
        <header className="page-header">
            <FormSelect className="group" placeholder="所有状态"
                options={Object.keys(MANIFEST_STATUS).map((status, index) => ({ key: index, value: status, text: MANIFEST_STATUS[status].name }))}></FormSelect>
            <FormSelect className="group" placeholder="所有品类"
                options={category.items.map((category_id, index) => ({ key: index, value: category_id, text: entities[category_id].name }))}></FormSelect>
            <Search></Search>
        </header>

        <Loader loading={manifest.fetching.list} data={manifest.items}>
            <ul>
                {manifest.items.map((manifest_id, index) => (
                    <Item key={index} manifestDetail={entities[manifest_id]} selected={manifest_selected.indexOf(manifest_id) >= 0} selectManifest={selectManifest} entities={entities}></Item>
                ))}
            </ul>
        </Loader>
    </div>
);