/**
 * 选择产品预定
 */
import React from 'react';
import { Link } from 'react-router-dom';
import { Loader, Search, CategoryCover } from '../../../common/';
import { FormSelect } from 'semantic-ui-react';
import { currency } from '../../../../utils';
import './style.scss';

export const BookSelect = ({ product, entities, category }) => (
	<div className="book-index-page page">
		<header className="page-header">
			<div className="upload add">
				<Link to={'/book/upload'} className="ui button primary">批量上传</Link>
			</div>

			<FormSelect className="category group" placeholder="所有品类"
				options={[{ key: 'empty', text: "所有品类", value: '' }].concat(category.items.map(category_id => ({ key: category_id, text: entities[category_id].name, value: category_id })))}
			></FormSelect>

			<Search></Search>
		</header>
		<Loader loading={product.fetching.list} data={product.items}>
			<ul>
				{product.items.map((product_id, index) => (
					<li key={index}>
						<div className="photo">
							<Link to={`/product/${product_id}`}>
								<CategoryCover></CategoryCover>
							</Link>
						</div>
						<div className="detail">
							<div className="l">
								<p className="code">No. {entities[product_id].code}</p>
								<p className="name">{entities[product_id].name}</p>
								<p className="unit-price">{currency.bind(this, entities[product_id].unit_price)}</p>
							</div>
							<div className="r">
								<div className="action">
									<a className="ui button red" onClick={addProduct.bind(this, product_id)}>订购</a>
								</div>
							</div>
						</div>
					</li>
				))}
			</ul>
		</Loader>
	</div>
);