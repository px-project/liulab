/**
 * 产品列表
 */
import React, { Component } from 'react';
import { Link } from 'react-router';
import DefaultPhoto from '../../../public/images/default.png';
import { Loader, Select } from '../../common/';
import './style.scss';

export class ProductComponent extends Component {

    componentWillMount() {
        let {xhttp} = this.props;
        xhttp.list('product');
        xhttp.list('category');
    }

    render() {
        let {entities, category, productPageState, product} = this.props;

        return (
            <div className="product-index-page page">
                <header className="list-header">
                    <Link className="button ui primary" to="/product/add">添加</Link>

                    <Select className="category group" placeholder="所有品类" empty={true}>
                        {category.items.map((category_id, category_index) => (
                            <option key={category_index} value={category_id}>{entities[category_id].name}</option>
                        ))}
                    </Select>

                    <div className="ui search">
                        <div className="ui icon input">
                            <input className="prompt" type="text" placeholder="" />
                            <i className="search icon"></i>
                        </div>
                    </div>
                </header>

                <Loader loading={product.fetching} data={product.items}>
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
                </Loader>
            </div>
        );
    }
}
