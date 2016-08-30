/**
 * 订购列表组件
 */
import React, {Component} from 'react';
import {SearchComponent as Search} from '../search/';
import {OrderComponent as Order} from '../order/';
import './style.scss';

export class BookComponent extends Component  {
    render () {
        return (
            <div>
                <Order />

                <Search />
            </div>
        );
    }
}
