/**
 * 用户详情组件
 */
import React, { Component } from 'react';
import './style.scss';

export class UserDetailComponent extends Component {
	componentWillMount() {
		this.props.xhttp.list('role');
	}

	handleSubmit(e) {
		// e.preventDefault();
		// props.xhttp({
		// 	action: 'create',
		// 	api: 'user',
		// 	data: props.form.getFieldsValue()
		// }, () => {
		// 	props.history.pushState(null, '/user');
		// });
		// this.props.
	}

	render() {
		let {entities, role} = this.props;

		return (
			<div className="user-detail">

			</div>
		)
	}
}
