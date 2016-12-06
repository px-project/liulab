/**
 * 选择商品下单方式的选择界面
 */
import React, { Component } from 'react';
import { Link } from 'react-router';
import './style.scss';
import defaultCategoryPhoto from '../../../../public/images/huluwa.jpg';

export class BookSelectSelectComponent extends Component {
	componentWillMount() {

	}

    componentDidUpdate () {
        $(this.refs.dropdown).dropdown();
    }


	// 变换界面状态
	changeCurrentPageState(props, status, e) {
		this.props.changeBookState(status === 'select' ? 'confirm' : 'select');
	}

	// 添加到购物车
	addProductTo(product_id) {
		this.props.addProduct(product_id, 1);
	}


	// 变换产品类型
	handleChangeTemplate(props, event) {
		let {xhttp, selectProductId} = props;
		let template_id = event.target.value;

		selectProductId(template_id);
		if (!template_id) return;

		this.getProductList(xhttp, { template_id });
		this.getTemplateDetail(xhttp, template_id);
	}

	render() {
		let {entities, template, xhttp, product, bookPageState, changeBookState} = this.props;
		let {template_id} = bookPageState;

		return (
			<div className="book-select-select">
				{product.items.length ? (
					<div className="book-index-select">
						<ul className="list">
							{product.items.map((product_id, product_index) => (
								<li key={product_index}>
									<div className="photo">

										<Link to={`/product/${product_id}`}>
											<img src={entities[product_id].category.photo ? `${window.server}/resource/${entities[product_id].category.photo}` : defaultCategoryPhoto} />
										</Link>

									</div>
									<div className="detail">
										<div className="l">
											<p className="code">{entities[product_id].code}</p>
											<p className="name">{entities[product_id].name}</p>
											<p className="unit-price">￥{entities[product_id].unit_price}</p>
										</div>
										<div className="r">
											<div className="action">
												<a className="ui button red" onClick={this.addProductTo.bind(this, product_id)}>订购</a>
											</div>
										</div>
									</div>
								</li>
							))}
						</ul>
					</div>) : (
						<div>暂无数据</div>
					)}
			</div>
		);
	}
}
