/**
 * 货单列表界面
 */
import React from 'react';
import { ManifestItemComponent as Item } from '../item/';
import { ManifestMenuComponent as Menu } from '../menu/';
import { Search, Loader } from '../../../../common/';
import { FormSelect } from 'semantic-ui-react';
import { MANIFEST_STATUS } from '../../../../../constants/';
import './style.scss';

export const ManifestList = ({ manifest, entities, category }) => (

    <div className="page manifest-page">
        <header className="page-header">
            <FormSelect className="group" placeholder="所有状态"      
                options={object.keys(MANIFEST_STATUS).map((status, index) => ({key: index, value: status, text: MANIFEST_STATUS[status].name}))}></FormSelect>
            <FormSelect className="group" placeholder="所有品类"
                options={category.items.map((category_id, index) => ({ key: index, value: category_id, text: entities[category_id].name }))}></FormSelect>
            <Search></Search>
        </header>

        <Loader loading={manifest.fetching} data={manifest.items}>
            <ul>
                {manifest.items.map((manifest_id, manifest_index) => (
                    <Item key={manifest_index} {...this.props} manifest_id={manifest_id}></Item>
                ))}
            </ul>
        </Loader>

        <Menu {...this.props}></Menu>
    </div>
);