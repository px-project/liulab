/**
 * 产品列表
 */
import React, { Component } from 'react';
import { Link } from 'react-router';
import './style.scss';

export class ProductComponent extends Component {

    componentWillMount() {
        let {xhttp} = this.props;

        this.getCategoryList(xhttp);
    }

    render() {
        let {entities, category, productPageState, product} = this.props;
        let {category_id} = productPageState;
        return (
            <div>
                <header className="list-header">
                    <Link className="button ui primary" to="/product/add">添加</Link>

                    <div className="select-product-type">
                        <select className="ui select dropdown" onChange={this.categoryChange.bind(this, this.props)}>
                            <option value="">请选择产品类型</option>
                            {category.items.length && category.items.map((category_id, index) => (
                                <option key={index} value={category_id}>{entities[category_id].name}</option>
                            ))}
                        </select>
                    </div>
                </header>

                {category_id &&
                    <div>
                        <table className="ui table">
                            <thead>
                                <tr>
                                    <th>序号</th>
                                    {entities[category_id].category.map((field, index) => (<th key={index}>{field.title}</th>))}
                                    <th>添加人</th>
                                    <th>操作</th>
                                </tr>
                            </thead>
                            <tbody>
                                {product.items.length && product.items.map((product_id, product_index) => (
                                    <tr key={product_index}>
                                        <td>{product_index + 1}</td>
                                        {entities[category_id].category.map((field, field_index) => (
                                            <td key={field_index}>{entities[product_id].data[field.key]}</td>
                                        ))}
                                        <td>{entities[product_id].create_user}</td>
                                        <td>
                                            <Link to={`/product/${product_id}/edit`}>编辑</Link>
                                            <a href="#">删除</a>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>}
            </div>
        );
    }

    // 处理品类变动
    categoryChange(props, e) {
        let category_id = e.target.value;
        props.selectCategoryId(category_id);

        if (category_id) {
            this.getProductList(props.xhttp, { category_id });
        }
    }


    // 获取品类列表
    getCategoryList(xhttp, conditions = {}) {
        xhttp({ action: 'list', api: 'category', conditions })
    }

    // 获取产品列表
    getProductList(xhttp, conditions = {}) {
        xhttp({ action: 'list', api: 'product', conditions });
    }
}
