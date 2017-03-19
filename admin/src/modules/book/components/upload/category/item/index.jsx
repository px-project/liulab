/**
 * 产品类型组件
 */
import React from 'react';
import classname from 'classname';
import { CategoryCover } from '../../../../../common/';
import './style.scss';

export const CategoryItem = ({ category_id, book_upload_category = [], categorySelect, entities }) => (
	<div className={`category-item ${classname({ selected: book_upload_category.indexOf(category_id) >= 0 })}`}
		onClick={categorySelect.bind(this, category_id)}>
		<CategoryCover className="category-cover" category_id={category_id}></CategoryCover>
		<i className="fa fa-check"></i>
		<h4 className="name">{entities[category_id].name}</h4>
	</div>
);