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
                <div>
                	<Link to={"/book/upload"}>
                		<i className="icon clone"></i>
                		<span>批量预定</span>
                	</Link>
                </div>
                <div>
                	<Link to={"/book/select"}>
                		<i className="icon add to cart"></i>
                		<span>指定产品</span>
                	</Link>
                </div>
            </div>
        );
    }
}
