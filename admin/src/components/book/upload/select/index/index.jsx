/**
 * 上传方式选择界面
 */
import React, {Component} from 'react';
import {ProductType} from '../product_type/';
import {Button} from 'antd';
import './style.scss';

export class BookUploadSelectComponent extends Component {

	componentWillMount () {
		let {entities, xhttp, template} = this.props;

		xhttp({
			action: 'list',
			api: 'template'
		});
	}

	render () {
		let {template, entities, changeBookState, bookPageState} = this.props;
		let {productTypeIndex} = bookPageState;
		return (
			<div className="upload-select">
				<div className="select">
				{
					template.items.map((template_id, index, arr) => {
						return (
							<ProductType len={arr.length} index={index} key={index} productType={entities[template_id]} {...this.props}></ProductType>
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
