/**
 * 货单列表界面
 */
import React, { Component } from 'react';
import { ManifestItemComponent as Item } from '../item/';
import { ManifestMenuComponent as Menu } from '../menu/';
import { Select, Search, Loader } from '../../../common/';
import { MANIFEST_STATUS } from '../../../../constants/';
import './style.scss';


export class ManifestComponent extends Component {
    componentWillMount() {
        let {xhttp} = this.props;
        this.getCategoryList();
        this.getManifestList();
    }
    render() {
        let {xhttp, manifest, entities, category} = this.props;
        return (
            <div className="page manifest-page">
                <header className="list-header">
                    <Select className="group" placeholder="所有状态" empty="true"></Select>
                    <Select className="group" placeholder="所有品类" empty="true" data={category}></Select>
                    <Search></Search>
                </header>

                <Loader loading={manifest.fetching} data={manifest.items}>
                    <ul>
                        {manifest.items.map((manifest_id, manifest_index) => (
                            <Item key={manifest_index} manifest={entities[manifest_id]} entities={entities}></Item>
                        ))}
                    </ul>
                </Loader>

                <Menu {...this.props}></Menu>
            </div>
        );
    }

    // 获取品类列表
    getCategoryList(conditions = {}) {
        this.props.xhttp.list('category', [], conditions);
    }

    // 获取货单列表
    getManifestList(conditions = {}) {
        this.props.xhttp.list('manifest', [], conditions);
    }
}