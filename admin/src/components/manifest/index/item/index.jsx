/**
 * 货单列表子项组件
 */
import React, { Component } from 'react';
import { MANIFEST_STATUS } from '../../../../constants/';
import moment from 'moment';
import { currency } from '../../../../utils/';
import { Link } from 'react-router';
import classname from 'classname';
import './style.scss';

export class ManifestItemComponent extends Component {
    render() {
        let {manifest, entities, manifestSelect, manifest_id} = this.props;
        let selected = !!manifest.selected && manifest.selected.indexOf(manifest_id) >= 0;
        let manifestData = entities[manifest_id];
        let category = manifestData.product.category_id;
        return (
            <li className="manifest-item" style={{ borderLeftColor: MANIFEST_STATUS[manifestData.status].color }}>
                <header className="manifest-item-header">
                    <div className={'select-item ' + classname({ selected: selected })}><a onClick={manifestSelect.bind(this, manifestData._id)}><i className="fa fa-check-circle-o"></i></a></div>
                    <p className="manifest-id">{manifestData.manifest_id}</p>
                    <p className="status" style={{ backgroundColor: MANIFEST_STATUS[manifestData.status].color }}>{MANIFEST_STATUS[manifestData.status].name}</p>
                </header>
                <div className="detail">
                    <div className="basic">
                        <p>
                            <i className="fa fa-user"></i>
                            <span className="value">{manifestData.create_user}</span>
                        </p>
                        <p>
                            <i className="fa fa-clock-o"></i>
                            <span className="value">{moment(manifestData.create_time).format('YYYY-MM-DD')}</span>
                        </p>
                    </div>
                    <div className="manifest-item-product">
                        <p>{manifestData.product.name}({manifestData.product.code})</p>
                        <p>{currency(manifestData.product.unit_price)} * {manifestData.num}</p>
                        <p>{entities[category].name}</p>
                    </div>
                </div>

                <Link className="detail-icon" to={'/manifest/' + manifestData.manifest_id}><i className="fa fa-angle-right"></i></Link>
            </li>
        );
    }
}