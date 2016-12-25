/**
 * 产品列表
 */
import React, { Component } from 'react';
import { Link } from 'react-router';
import DefaultPhoto from '../../../public/images/default.png';
import './style.scss';

export class ProductComponent extends Component {

    componentWillMount() {
        this.getProductList();
        this.getCategoryList();
    }

    componentDidMount () {
        $(this.refs.dropdown).dropdown();
    }

    render() {
        let {entities, category, productPageState, product} = this.props;

        return (
            <div className="product-index-page page">
                <header className="list-header">
                    <Link className="button ui primary" to="/product/add">添加</Link>

                    <div className="select-product-type group">
                        <select className="ui select dropdown" onChange={this.categoryChange.bind(this)} ref="dropdown">
                            <option value="">所有品类</option>
                            {category.items.length && category.items.map((category_id, index) => (
                                <option key={index} value={category_id}>{entities[category_id].name}</option>
                            ))}
                        </select>
                    </div>

                    <div className="ui search">
                        <div className="ui icon input">
                            <input className="prompt" type="text" placeholder="" />
                            <i className="search icon"></i>
                        </div>
                    </div>
                </header>

                {!product.fetching ? (
                    <div className="list">
                        <ul>
                            {product.items.map((product_id, product_index) => (
                                <li key={product_index}>
                                    <Link to={`/product/${product_id}`}>
                                        <div className="photo">
                                            <img src={entities[product_id].category.photo ? `${window.server}/resource/${entities[product_id].category.photo}` : DefaultPhoto} />
                                        </div>
                                        <div className="info">
                                            <p className="name">{entities[product_id].name}</p>
                                            <p className="code">No. {entities[product_id].code}</p>
                                        </div>
                                    </Link>
                                </li>
                            ))}
                        </ul>

                    </div>) : (
                        <div>
                            加载中
                    </div>)}
            </div>
        );
    }

    // 处理品类变动
    categoryChange(props, e) {
        let category_id = e.target.value;
        this.props.selectCategoryId(category_id);

        if (category_id) {
            this.getProductList({ category_id });
        }
    }


    // 获取品类列表
    getCategoryList(conditions = {}) {
        this.props.xhttp({ action: 'list', api: 'category', conditions });
    }

    // 获取产品列表
    getProductList(conditions = {}) {
        this.props.xhttp({ action: 'list', api: 'product', conditions });
    }
}
