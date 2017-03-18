/**
 * 品类详情界面
 */
import React from 'react';
import { Loader, Sec } from '../../../common';
import { ViewFields, ViewInfo } from '..';
import { Button } from 'semantic-ui-react';
import './style.scss';

export const CategoryDetail = ({ category, entities }) => (
    <Loader className="category-detail-page page" loading={category.fetching}>
        <header>
            <Button color="teal">编辑</Button>
        </header>

        <Sec className="info" title="品类信息">
            <ViewInfo info={entities[category.detail]}></ViewInfo>
        </Sec>

        <Sec className="fields" title="属性详情">
            <ViewFields category={entities[category.detail]}></ViewFields>
        </Sec>

    </Loader>
);