/**
 * 货单列表子项组件
 */
import React, { Component } from 'react';
import { MANIFEST_STATUS } from '../../../../constants/';
import moment from 'moment';
import { currency } from '../../../../utils/';
import { Link } from 'react-router';
import './style.scss';

export class ManifestItemComponent extends Component {
    render() {
        let {manifest, entities} = this.props;
        let category = manifest.product.category_id;
        return (
            <li className="manifest-item" style={{ borderLeftColor: MANIFEST_STATUS[manifest.status].color }}>
                <header className="manifest-item-header">
                    <div className="select-item"><a><i className="fa fa-check-circle-o"></i></a></div>
                    <p className="manifest-id">{manifest.manifest_id}</p>
                    <p className="status" style={{ backgroundColor: MANIFEST_STATUS[manifest.status].color }}>{MANIFEST_STATUS[manifest.status].name}</p>
                </header>
                <div className="detail">
                    <div className="basic">
                        <p>
                            <i className="fa fa-user"></i>
                            <span className="value">{manifest.create_user}</span>
                        </p>
                        <p>
                            <i className="fa fa-clock-o"></i>
                            <span className="value">{moment(manifest.create_time).format('YYYY-MM-DD')}</span>
                        </p>
                    </div>
                    <div className="manifest-item-product">
                        <p>{manifest.product.name}({manifest.product.code})</p>
                        <p>{currency(manifest.product.unit_price)} * {manifest.num}</p>
                        <p>{entities[category].name}</p>
                    </div>
                </div>

                <Link className="detail-icon" to={'/manifest/' + manifest.manifest_id}><i className="fa fa-angle-right"></i></Link>
            </li>
        );
    }
}