/**
 * 上传方式上传界面
 */
import React from 'react';
import './style.scss';

export class BookUploadTemplate extends React.Component {

	// 上传excel
	uploadOrderData(props, e) {
		let { xhttp, book, xbook, xform, entities } = props, { selectCategory } = book, { changeState } = xbook;
		let categoryArr = Object.keys(selectCategory).filter(category_id => selectCategory[category_id]);

		xhttp.upload('categoryTemplate', [categoryArr.join(',')], { file: e.target.files[0] }).then(result => {
			let { data: orders } = result;

			let newData = { description: '', products: [] };

			Object.keys(orders).map(category_id => {
				orders[category_id].forEach(product => {
					newData.products.push({
						name: product.name,
						code: product.code,
						num: product.num,
						unit_price: product.unit_price,
						category: category_id,
						attrs: Object.assign({}, ...entities[category_id].attrs.filter((item, index) => index > 3).map(attr => ({ [attr.key]: product[attr.key] })))
					});
				});
			});

			xform.init(newData);
			changeState('preview');
		});
	}

	// 下载模板
	download() {
		let { book, category, xhttp, entities } = this.props, { selectCategory } = book;
		let categoryArr = Object.keys(selectCategory).filter(category_id => selectCategory[category_id]);
		let ids = Object.keys(selectCategory).filter(category_id => selectCategory[category_id]);
		let names = ids.map(id => entities[id].name);
		xhttp.download('categoryTemplate', [categoryArr.join(',')], {}, { name: names.join('_') + '.xlsx' });
	}

	render() {
		return (
			<div className="book-upload-upload">
				<div className="download-sec">
					<a onClick={this.download.bind(this)}>
						<i className="icon cloud download"></i>
						<span className="main">下载模板文件</span>
					</a>
				</div>
				<div className="upload-sec">
					<i className="icon cloud upload"></i>
					<p className="main">上传订单数据</p>
					<input type="file" onChange={this.uploadOrderData.bind(this, this.props)} />
				</div>
				<p className="describe">注：请严格按照规则填写，切勿修改模板文件内容。</p>
			</div>
		);
	}

}
