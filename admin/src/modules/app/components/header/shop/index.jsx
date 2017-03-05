/**
 * 头部购物车组件
 */
import React, { Component } from 'react';
import { Link } from 'react-router';
import classname from 'classname';
import { CategoryCover } from '../../../../common';
import './style.scss';

export class AppHeaderShopComponent extends Component {

    componentDidMount() {
        document.querySelector('body').addEventListener('click', e => {
            if (!this.refs.shop_list.contains(e.target) && !this.refs.shop_show.contains(e.target)) {
                this.props.appShopShow(false);
            }
        })
    }


    render() {
        let {book, entities, app, appShopShow, product_select} = this.props;

        return (
            <div className={`header-shop ${classname({ active: app.shop })}`}>
                <div className="show" onClick={appShopShow.bind(this, true)} ref="shop_show">
                    <i className="fa fa-shopping-cart"></i>
                    <span className="name">购物车</span>
                    (<span>{Object.keys(product_select).reduce((a, b) => (a + product_select[b]), 0)}</span>)
                </div>

                <div className="list" ref="shop_list">
                    {Object.keys(product_select).length ? (
                        <div className="products">
                            <h5>已选产品</h5>
                            <ul>
                                {Object.keys(product_select).map((product_id, index) => (
                                    <li key={index}>
                                        <CategoryCover className="photo" category_id={category._id}></CategoryCover>

                                        <div className="info">
                                            <span className="name">{entities[product_id].name}</span>
                                            <span className="code">No. {entities[product_id].code}</span>
                                            <span className="num">
                                                <a className="action">-</a>
                                                <span className="value">{product_select[product_id]}</span>
                                                <a className="action">+</a>
                                            </span>
                                        </div>
                                    </li>
                                ))}
                            </ul>

                            <div className="btn-group">
                                <Link to="/book/confirm" className="ui button red block" onClick={appShopShow.bind(this, false)}>确认订单</Link>
                            </div>
                        </div>
                    ) : (
                            <div className="no-data">
                                <span className="txt">购物车是空的！</span>

                                <div className="btn-group">
                                    <Link to="/book" className="ui button red bock" onClick={appShopShow.bind(this, false)}>前去选购</Link>
                                </div>
                            </div>
                        )}
                </div>
            </div>
        );
    }
}