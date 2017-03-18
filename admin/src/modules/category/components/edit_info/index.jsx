/**
 * 编辑详情组件
 */
import React from 'react';
import { Form } from 'semantic-ui-react';
import { Field } from 'redux-form';
import { FormInput } from 'semantic-ui-react';
import { UploadImage, CategoryCover, Field as FieldMap } from '../../../common';
import './style.scss';

export const CategoryEditInfo = () => (
	<div className="category-info-edit">
		<UploadImage className="upload"></UploadImage>
		<div className="info">
			<Field component={FormInput} label="名称" name="name" inline></Field>
			<Field component={FormInput} label="缩写" name="abbr" inline></Field>
			<Field component={FormInput} label="简介" name="description" inline className="description"></Field>
		</div>
	</div>
);