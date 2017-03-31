/**
 * 产品列表组件
 */
import React from 'react';
import { Link } from 'react-router-dom';
import { Loader, CategoryCover } from '../../../common';
import { FormSelect, Search } from 'semantic-ui-react';
import './style.scss';

export const ProductList = ({ entities, category, product }) => (
    <div className="product-page page">
        <header className="page-header">
            <Link className="button ui primary" to="/product/add">添加</Link>

            <FormSelect options={ category.items.map((category_id, index) => ({ key: index, value: category_id, text: entities[category_id].name })) }
                className="group" placeholder="所有品类"></FormSelect>

            <Search></Search>
        </header>

        <Loader loading={ product.fetching.list } data={ product.items }>
            <ul>
                { product.items.map((product_id, product_index) => (
                    <li key={ product_index }>
                        <Link to={ `/product/${product_id}` }>
                            <CategoryCover className="photo" category={ entities[product_id].category._id }></CategoryCover>
                            <div className="info">
                                <p className="name">{ entities[product_id].name }</p>
                                <p className="code">No. { entities[product_id].code }</p>
                            </div>
                        </Link>
                    </li>
                )) }
            </ul>
        </Loader>
    </div>
);