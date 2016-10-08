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
		console.log(productTypeIndex.indexOf(true));
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
					<Button disabled={productTypeIndex.indexOf(true) === -1} type="primary" size="large" onClick={changeBookState.bind(this, 'upload')}>继续</Button>
				</div>
			</div>
		);
	}
}
