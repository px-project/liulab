/**
 * 上传方式选择界面
 */
import React, { Component } from 'react';
import { ProductType } from '../product_type/';
import './style.scss';

export class BookUploadSelectComponent extends Component {

	componentWillMount() {
		let {entities, xhttp, category} = this.props;
		xhttp.list('category');
	}

	render() {
		let {category, entities, book} = this.props;
		let {selectCategory} = book;
		let {changeState, toggleCategory} = this.props.xbook;
		return (
			<div className="upload-select">
				<div className="select">
					{!category.fetching ? (
						<div className="category-list">
							{category.items.map((category_id, category_index) => (
								<ProductType key={category_index} toggle={toggleCategory} category={entities[category_id]} selected={!!selectCategory[category_id]}></ProductType>
							))}
						</div>) : ''}
				</div>
				<div className="btn-group">
					<button className="ui button primary" onClick={changeState.bind(this, 'upload')}>继续</button>
				</div>
			</div>
		);
	}
}
