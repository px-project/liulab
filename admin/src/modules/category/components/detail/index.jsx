/**
 * 品类详情界面
 */
import React from 'react';
import { Loader, Sec } from '../../../common';
import { ViewFields, ViewInfo } from '..';
import { Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import './style.scss';

export const CategoryDetail = ({ category, entities, match }) => (
    <Loader className="category-detail-page page" loading={ category.fetching.detail }>
        <header>
            <Link className="ui button teal" to={ match.url + '/edit' }>编辑</Link>
        </header>

        <Sec className="info" title="品类信息">
            <ViewInfo info={ entities[category.detail] }></ViewInfo>
        </Sec>

        <Sec className="fields" title="属性详情">
            <ViewFields category={ entities[category.detail] }></ViewFields>
        </Sec>

    </Loader>
);