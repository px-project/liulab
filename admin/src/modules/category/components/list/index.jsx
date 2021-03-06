/**
 * 品类列表组件
 */
import React, { Component } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { Loader, Image, CategoryCover } from '../../../common/';
import './style.scss';

export const CategoryList = ({ entities, category }) => (
	<div className="category-list-page page">
		<header className="page-header">
			<Link className="ui button primary" to="/category/add">添加</Link>
		</header>

		<Loader loading={category.fetching.list} data={category.items}>
			<ul>
				{category.items.map((category_id, category_index) => (
					<li key={category_index}>
						<Link to={`/category/${category_id}`}>
							<CategoryCover category_id={category_id} className="photo"></CategoryCover>
							<div className="info">
								<div className="name">{entities[category_id].name}</div>
								<div className="description">{entities[category_id].description}</div>
							</div>
						</Link>
					</li>
				))}
			</ul>
		</Loader>
	</div>
);