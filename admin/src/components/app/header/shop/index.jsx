/**
 * 头部购物车组件
 */
import React, { Component } from 'react';
import { Link } from 'react-router';
import defaultPhoto from '../../../../public/images/huluwa.jpg';
import './style.scss';

export class AppHeaderShopComponent extends Component {
    render() {
        let {bookPageState, entities, changeBookState} = this.props;
        let {productList} = bookPageState;

        return (
            <div className="header-shop">
                <div className="show">
                    <i className="fa fa-shopping-cart"></i>
                    <span className="name">购物车</span>
                    (<span>{Object.keys(productList).reduce((a, b) => (a + productList[b]), 0)}</span>)
                </div>

                <div className="list">
                    {Object.keys(productList).length ? (
                        <div className="products">
                            <h5>已选产品</h5>
                            <ul>
                                {Object.keys(productList).map((product_id, index) => (
                                    <li key={index}>
                                        <div className="photo">
                                            <img src={entities[product_id].category.photo ? `${window.server}/resource/${entities[product_id].category.photo}` : defaultPhoto} />
                                        </div>
                                        <div className="info">
                                            <span className="name">{entities[product_id].name}</span>
                                            <span className="code">{entities[product_id].code}</span>
                                            <span className="num">
                                                <a className="action">-</a>
                                                <span className="value">{productList[product_id]}</span>
                                                <a className="action">+</a>
                                            </span>
                                        </div>
                                    </li>
                                ))}
                            </ul>

                            <div className="btn-group">
                                <Link to="/book/confirm" className="ui button red block">确认订单</Link>

                            </div>
                        </div>
                    ) : (
                            <div className="no-data">暂无数据</div>
                        )}
                </div>
            </div>
        );
    }
}