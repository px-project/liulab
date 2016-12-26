/**
 * 订单首页
 */
import React, { Component } from 'react';
import { Link } from 'react-router';
import classname from 'classname';
import './style.scss';
import routes from '../../../../config/routes.json';


export class OrderComponent extends Component {
    render() {
        let orderRoute = routes.filter(item => item.path === 'order')[0].pages.filter(item => item.path === '')[0].children;
        let pathname = this.props.location.pathname;
        pathname = pathname.charAt(0) === '/' ? pathname : `/${pathname}`;
        return (
            <div className="page order-index-page">
                <header className="list-header">
                    <nav className="nav">
                        <ul>
                            {orderRoute.map((route, index) => (
                                <li key={index} className={classname({ active: pathname === `/order/${route.path}` })}>
                                    <Link to={`/order/${route.path}`}>{route.name}</Link>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </header>

                <div className="list">{React.cloneElement(this.props.children, Object.assign({}, ...Object.keys(this.props).filter(key => key !== 'children').map(key => ({ [key]: this.props[key] }))))}</div>
            </div>
        );
    }
}

