/**
 * 货单列表子项
 */
import React from 'react';
import { MANIFEST_STATUS } from '../../../constants';
import moment from 'moment';
import { currency } from '../../../../../utils';
import { Link } from 'react-router-dom';
import classname from 'classname';
import './style.scss';

export const Item = ({ manifestDetail = {}, selected = false, selectManifest, entities }) => (
    <li className="manifest-item" style={{ borderLeftColor: MANIFEST_STATUS[manifestDetail.status].color }}>
        <header className="manifest-item-header">
            <div className={'select-item ' + classname({ selected: selected })}>
                <a onClick={() => selectManifest(manifestDetail._id)}><i className="fa fa-check-circle-o"></i></a>
            </div>
            <p className="manifest-id">{manifestDetail.manifest_id}</p>
            <p className="status" style={{ backgroundColor: MANIFEST_STATUS[manifestDetail.status].color }}>{MANIFEST_STATUS[manifestDetail.status].name}</p>
        </header>
        <div className="detail">
            <div className="basic">
                <p>
                    <i className="fa fa-user"></i>
                    <span className="value">{manifestDetail.create_user ? (manifestDetail.create_user.name || manifestDetail.create_user.username) : '-'}</span>
                </p>
                <p>
                    <i className="fa fa-clock-o"></i>
                    <span className="value">{moment(manifestDetail.create_time).format('YYYY-MM-DD')}</span>
                </p>
            </div>
            <div className="manifest-item-product">
                <p>{manifestDetail.product.name}({manifestDetail.product.code})</p>
                <p>{currency(manifestDetail.product.unit_price)} * {manifestDetail.num}</p>
                <p>{entities[manifestDetail.category] && entities[manifestDetail.category].name}</p>
            </div>
        </div>

        <Link className="detail-icon" to={'/manifest/' + manifestDetail.manifest_id}><i className="fa fa-angle-right"></i></Link>
    </li>
);