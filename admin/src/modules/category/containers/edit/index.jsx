/**
 * 编辑品类界面
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import { CategoryEdit } from '../../components';

class categoryEditContainer extends Component {

    render() {
        // return (<CategoryEdit {...this.props}></CategoryEdit>);
        return <div></div>;
    }

}

function mapStateToProps(state) {
    return state;
}

function mapDispatchToProps(dispatch) {
    return {};
}

export const CategoryEditContainer = connect(mapStateToProps, mapDispatchToProps)(categoryEditContainer);



// export class CategoryEditComponent extends Component {

// 	constructor(props) {
// 		super(props);
// 		this.state = { page: props.routes[2].path === 'add' ? 'add' : 'edit' };
// 	}

// 	componentWillMount() {
// 		let { props, state } = this, { xform, xhttp, params } = props, { page } = state;

// 		// 添加
// 		if (page === 'add') {
// 			xform.init({ attrs: INIT_ATTRS, new_attr: NEW_ATTRS });
// 		}

// 		// 编辑
// 		if (page === 'edit') {
// 			xhttp.detail('category', [params.category_id]).then(result => {
// 				xform.init(Object.assign({}, result, { new_attr: NEW_ATTRS }));
// 			});
// 		}
// 	}

// 	render() {
// 	}

// 	// 保存品类
// 	save() {
// 		let { props, state } = this, { xhttp, formData, history, params } = props, { page } = state;

// 		if (page === 'add') {
// 			return xhttp.create('category', [], formData).then(result => this.redirect(result._id));
// 		}
// 		if (page === 'edit') {
// 			return xhttp.update('category', [params.category_id], formData).then(result => this.redirect(result._id));
// 		}
// 	}

// 	// 重定向到详情界面
// 	redirect(category_id) {
// 		let { history } = this.props;
// 		history.push(null, `/category/${category_id}`);
// 	}
// }
