/**
 * view info 
 */
import React from 'react';
import { CategoryCover, Field } from '../../../common';
import './style.scss';

export const ViewInfo = (info = {}) => (
    <div className="category-view-info">
        <CategoryCover></CategoryCover>
        <div className="info">
            <Field name="名称">{info.name}</Field>
            <Field name="简称">{info.abbr}</Field>
            <Field name="简介">{info.description}</Field>
        </div>
    </div>
)