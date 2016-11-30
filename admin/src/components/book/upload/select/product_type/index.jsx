/**
 * 产品类型组件
 */
import React, {Component} from 'react';
import classname from 'classname';
import './style.scss';
import defaultPhoto from '../../../../../public/images/huluwa.jpg';

export class ProductType extends Component {
	handleClick (e) {
	}

	render () {
		let {categoryData, selected, selectCategory} = this.props;

		return (
			<div className={classname({'product-type': true, selected })}
				onClick={selectCategory.bind(this, categoryData._id)}>
				<div className="logo">
					<img src={categoryData.photo ? `${window.server}/resource/${categoryData.photo}` : defaultPhoto}/>
				</div>
				<h4 className="name">{categoryData.name}</h4>
			</div>
		);
	}
}
