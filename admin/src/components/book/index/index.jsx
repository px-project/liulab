/**
 * 订购列表组件
 */
import React, {Component} from 'react';
import {SearchComponent as Search} from '../search/';
import {OrderComponent as Order} from '../order/';
import {UploadComponent as Upload} from '../upload/';
import './style.scss';

export class BookComponent extends Component  {
    render () {
        return (
            <div>
                <Upload {...this.props}></Upload>
            </div>
        );
    }
}
