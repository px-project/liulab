/**
 * 添加产品
 */
import React, { Component } from 'react';
import { Link } from 'react-router';
import { CategoryCover } from '../../../common';
import './style.scss';

export class ProductAddComponent extends Component {
    componentWillMount() {
        this.props.xhttp.list('category');
    }

    componentDidUpdate() {
        $(this.refs.dropdown).dropdown();
    }

    render() {
        let {category, entities, formData} = this.props;
        return (
            <div className="product-add-page page">
                <div className="basic sec">
                    <CategoryCover className="photo" category_id={formData.category_id}></CategoryCover>
                    <div className="info ui form">
                        <div className="inline field category">
                            <label>品类</label>
                            <select className="ui dropdown" ref="dropdown" onChange={this.selectCategory.bind(this)}>
                                <option value="">请选择品类</option>
                                {!category.fetching && category.items.map((category_id, category_index) => (
                                    <option key={category_index} value={category_id}>{entities[category_id].name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="inline field name">
                            <label>名称</label>
                            <input type="text" />
                        </div>
                        <div className="inline field code">
                            <label>编号</label>
                            <input type="text" />
                        </div>
                        <div className="inline field unit_price">
                            <label>单价</label>
                            <input type="number" />
                        </div>
                    </div>
                </div>
                {formData.category_id && !category.fetching ? (
                    <div className="detail sec">
                        <div className="ui form">
                            {entities[formData.category_id].attrs.filter((item, index) => index > 3).map((attr, index) => (
                                <div className={`inline field ${attr.key}`} key={index}>
                                    <label>{attr.title}</label>
                                    {attr.attr_type === 'string' ? (<input type="text" />) : ''}
                                    {attr.attr_type === 'number' ? (<input type="number" />) : ''}
                                    {attr.attr_type === 'select' ? (
                                        <select ref="dropdown" className="ui dropdown"></select>
                                    ) : ''}
                                </div>
                            ))}
                        </div>
                    </div>
                ) : ''}

                <div className="btn-group">
                    <button className="ui button primary">保存</button>
                    <Link to={'/product'} className="ui button red">取消</Link>
                </div>
            </div>
        );
    }

    selectCategory(e) {
        let category_id = e.target.value;
        let {xhttp, xform} = this.props;

        xhttp.detail('category', [category_id]);
        xhttp.detail('productCode', [category_id]);

        xform(category_id, 'category_id');
    }
}