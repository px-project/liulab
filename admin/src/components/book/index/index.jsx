/**
 * 订购列表组件
 */
import React, {Component} from 'react';
import {Link} from 'react-router';
import './style.scss';

export class BookComponent extends Component {
    render () {
        return (
            <div className="book-index">
                <div><Link to={"/book/upload"}>批量预定</Link></div>
                <div><Link to={"/book/select"}>指定预定</Link></div>
            </div>
        );
    }
}
