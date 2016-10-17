/**
 * 产品列表
 */
import React, { Component } from 'react';
import { Link } from 'react-router';
import './style.scss';

export class ProductComponent extends Component {

    componentWillMount() {
        let {xhttp} = this.props;

        this.getTemplateList(xhttp);
    }

    render() {
        let {entities, template, productPageState, product} = this.props;
        let {template_id} = productPageState;
        return (
            <div>
                <header className="list-header">
                    <Link className="button ui primary" to="/product/add">添加</Link>

                    <div className="select-product-type">
                        <select className="ui select dropdown" onChange={this.tamplateChange.bind(this, this.props)}>
                            <option value="">请选择产品类型</option>
                            {template.items.length && template.items.map((template_id, index) => (
                                <option key={index} value={template_id}>{entities[template_id].name}</option>
                            ))}
                        </select>
                    </div>
                </header>

                {template_id &&
                    <div>
                        <table className="ui table">
                            <thead>
                                <tr>
                                    <th>序号</th>
                                    {entities[template_id].template.map((field, index) => (<th key={index}>{field.title}</th>))}
                                    <th>添加人</th>
                                    <th>操作</th>
                                </tr>
                            </thead>
                            <tbody>
                                {product.items.length && product.items.map((product_id, product_index) => (
                                    <tr key={product_index}>
                                        <td>{product_index + 1}</td>
                                        {entities[template_id].template.map((field, field_index) => (
                                            <td key={field_index}>{entities[product_id].data[field.key]}</td>
                                        ))}
                                        <td>{entities[product_id].create_user}</td>
                                        <td>
                                            <Link to={`/product/${product_id}`}>编辑</Link>
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

    // 处理模板变动
    tamplateChange(props, e) {
        let template_id = e.target.value;
        props.selectTemplateId(template_id);

        if (template_id) {
            this.getProductList(props.xhttp, { template_id });
        }
    }


    // 获取模板列表
    getTemplateList(xhttp, conditions = {}) {
        xhttp({ action: 'list', api: 'template', conditions })
    }

    // 获取产品列表
    getProductList(xhttp, conditions = {}) {
        xhttp({ action: 'list', api: 'product', conditions });
    }
}
