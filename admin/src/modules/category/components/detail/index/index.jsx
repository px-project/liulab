/**
 * 品类详情界面
 */
import React, { Component } from 'react';
import { Loader, Sec } from '../../../../common';
import './style.scss';

export class CategoryDetailComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 'view'
        };
    }


    componentWillMount() {
        let {params, xhttp} = this.props;
        xhttp.detail('category', [params.category_id]);
    }


    render() {
        let {category, entities} = this.props, categoryDetail = entities[category.detail];
        return (
            <div className="category-detail-page page">
                <Sec className="info" title="品类信息">

                </Sec>

                <Sec className="fields" title="属性详情">

                </Sec>
            </div>
        );
    }
}