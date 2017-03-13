/**
 * 品类详情界面
 */
import React from 'react';
import { Loader, Sec } from '../../../common';
import { ViewFields, ViewInfo } from '..';

import './style.scss';

export const CategoryDetail = ({ category, entities }) => (
    <Loader className="category-detail-page page" loading={category.fetching}>
        <Sec className="info" title="品类信息">
            <ViewInfo></ViewInfo>
        </Sec>

        <Sec className="fields" title="属性详情">
            <ViewFields category={entities[category.detail]}></ViewFields>
        </Sec>
    </Loader>
);