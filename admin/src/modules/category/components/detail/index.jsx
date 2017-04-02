/**
 * 品类详情界面
 */
import React from 'react';
import { Sec } from '../../../common';
import { ViewFields, ViewInfo } from '..';
import { Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import './style.scss';

export const CategoryDetail = ({ detail, match }) => (
    <div className="category-detail">
        <header className="page-header">
            <Link className="ui button teal" to={ match.url + '/edit' }>编辑</Link>
        </header>

        <Sec className="info" title="品类信息">
            <ViewInfo info={ detail }></ViewInfo>
        </Sec>

        <Sec className="fields" title="属性详情">
            <ViewFields category={ detail }></ViewFields>
        </Sec>
    </div>
);