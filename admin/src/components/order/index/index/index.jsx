/**
 * 订单首页
 */
import React, { Component } from 'react';
import { Link } from 'react-router';
import './style.scss';

export class OrderComponent extends Component {
    render() {
        return (
            <div className="page order-index-page">
                <header className="list-header">
                    <button className="ui button primary">下载</button>
                    <nav className="nav">
                        <ul>
                            <li><Link to={'/order'}>概述</Link></li>
                            <li><Link to={'/order/child'}>子订单</Link></li>
                        </ul>
                    </nav>
                </header>

                <div className="list">{React.cloneElement(this.props.children, Object.assign({}, ...Object.keys(this.props).filter(key => key !== 'children').map(key => ({ [key]: this.props[key] }))))}</div>
            </div>
        );
    }
}

