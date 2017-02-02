/**
 * 订购
 */
import React, { Component } from 'react';
import { MANIFEST_STATUS } from '../../../../../constants/';
import { ManifestMenuItemComponent as Item } from '../item/';
import './style.scss';

export class Book extends Component {
    render() {
        let {list} = this.props;
        return (
            <div className="manifest-menu-book menu-sec">
                <header>
                    <h3>审核通过订单</h3>
                    <div className="actions">
                        <button className="ui button teal mini" onClick={this.book.bind(this, 'booked')}>已订购</button>
                    </div>
                </header>
                <ul>
                    {list.map((item, index) => (
                        <Item manifest={item} key={index}></Item>
                    ))}
                </ul>
            </div>
        );
    }
    // 订货
    book(status) {
        let {xhttp, list} = this.props;
        xhttp.update('manifest', [list.map(item => item._id).join(',')], { status }).then(result => {

        });
    }
}