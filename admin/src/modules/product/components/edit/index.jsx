/**
 * 编辑产品
 */
import React from 'react';
import { Link } from 'react-router-dom';
import { CategoryCover, Sec } from '../../../common';
import { reduxForm, Field } from 'redux-form';
import { FormSelect, Form, FormInput, ButtonGroup, Button } from 'semantic-ui-react';
import './style.scss';

// const SelectCategory = () => (

// )


@reduxForm({
    form: 'product_edit'
})
export class ProductEdit extends React.Component {
    render() {
        return (
            <Form className="product-edit">
                <Sec className="basic" title="基本信息">
                    <CategoryCover className="photo"></CategoryCover>
                    <div className="info">
                        <Field name="category_id" component={ FormSelect } label="品类" inline={ true } block={ true }></Field>
                        <Field name="name" component={ FormInput } label="名称" inline={ true }></Field>
                        <Field name="code" component={ FormInput } label="编号" inline={ true }></Field>
                        <Field name="unit_price" type="number" component={ FormInput } label="单价" inline={ true }></Field>
                    </div>
                </Sec>

                <Sec className="detail" title="产品详情">

                    { false && formData.category_id && !category.fetching ? (
                        <div className="detail sec">
                            <div className="ui form">
                                { entities[formData.category_id].attrs.filter((item, index) => index > 3).map((attr, index) => (
                                    <div className={ `inline field ${attr.key}` } key={ index }>
                                        <label>{ attr.title }</label>
                                        { attr.attr_type === 'string' ? (<input type="text" />) : '' }
                                        { attr.attr_type === 'number' ? (<input type="number" />) : '' }
                                        { attr.attr_type === 'select' ? (
                                            <select ref="dropdown" className="ui dropdown"></select>
                                        ) : '' }
                                    </div>
                                )) }
                            </div>
                        </div>
                    ) : '' }
                </Sec>


                <ButtonGroup>
                    <Button color="primary">保存</Button>
                    <Button type="button">
                        <Link to="/product">取消</Link>
                    </Button>
                </ButtonGroup>
            </Form>
        );
    }
}