/**
 * 上传方式选择界面
 */
import React, {Component} from 'react';
import {ProductType} from '../product_type/';
import {Button} from 'antd';
import './style.scss';

export class BookUploadSelectComponent extends Component {

	componentWillMount () {
		let {entities, xhttp, category} = this.props;

		xhttp({
			action: 'list',
			api: 'category'
		});
	}

	render () {
		let {category, entities, changeBookState, bookPageState} = this.props;
		let {productTypeIndex} = bookPageState;
		return (
			<div className="upload-select">
				<div className="select">
				{
					category.items.map((category_id, index, arr) => {
						return (
							<ProductType len={arr.length} index={index} key={index} productType={entities[category_id]} {...this.props}></ProductType>
						);
					})
				}
				</div>
				<div className="btn-group">
					<button className="ui button primary"
						disabled={productTypeIndex.indexOf(true) === -1} onClick={changeBookState.bind(this, 'upload')}>继续</button>
				</div>
			</div>
		);
	}
}
