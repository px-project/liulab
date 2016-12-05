/**
 * 头部购物车组件
 */
import React, {Component} from 'react';
import './style.scss';

export class AppHeaderShopComponent extends Component {
    render () {
        let {productList} = this.props.bookPageState;
        return (
            <div className="header-shop">
                <div className="show">
                    <i className="fa fa-shopping-cart"></i>
                    <span className="name">购物车</span>
                    (<span>{Object.keys(productList).reduce((a, b) => (a + productList[b]), 0)}</span>)
                </div>
            </div>
        );
    }
}