/**
 * 用户详情组件
 */
import React, {Component} from 'react';
import './style.scss';
import {Form, Button, Input, Select} from 'antd';
let FormItem = Form.Item;
let Option = Select.Option;

class UserDetailForm extends Component  {
	componentWillMount () {
		this.props.xhttp({
			action: 'list',
			api: 'role'
		})
	}

	handleSubmit (props, e) {
		 e.preventDefault();
	    props.xhttp({
	    	action: 'create',
	    	api: 'user',
	    	data: props.form.getFieldsValue()
	    }, () => {
			props.history.pushState(null, '/user');
	    });
	}

    render () {
    	let {entities, role} = this.props;
	    const { getFieldDecorator } = this.props.form;
		let formItemLayout = {
			labelCol: {span: 2, offset: 6},
			wrapperCol: {span: 6},
			style: {marginTop: 15}
		};
		return (
			<div>
				<Form onSubmit={this.handleSubmit.bind(this, this.props)}>
					<FormItem label="姓名" {...formItemLayout}>
					{
						getFieldDecorator('name', {rules: [{required: true, message: '请输入用户姓名'}]})(
							<Input required></Input>
						)
					}
					</FormItem>
					<FormItem label="角色" {...formItemLayout}>

					{getFieldDecorator('role', { rules: [{ required: true, message: '请选择角色' }]})(
						<Select>
							{
								role.items.map((item, index) => {
									return (
										<Option key={index} value={item}>{entities[item].name}</Option>
									)
								})
							}
						</Select>
					)}
					</FormItem>
					<FormItem label="账号" {...formItemLayout}>
					{
						getFieldDecorator('username', {rules: [{required: true, message: '请输入账号'}]})(
							<Input required></Input>
						)
					}
					</FormItem>
					<FormItem label="密码" {...formItemLayout}>
					{
						getFieldDecorator('password', {rules: [{required: true, message: '请输入密码'}]})(
							<Input type="password" required></Input>
						)
					}
					</FormItem>
					<FormItem label="确认密码" {...formItemLayout}>
					{
						getFieldDecorator('password', {rules: [{required: true, message: '请再次输入密码'}]})(
							<Input type="password" required></Input>
						)
					}
					</FormItem>
					<FormItem label="联系方式" {...formItemLayout}>
					{
						getFieldDecorator('phone', {rules: [{required: true, message: '请输入联系方式'}]})(
							<Input required></Input>
						)
					}
					</FormItem>
					<FormItem wrapperCol={{ span: 16, offset: 8 }} style={{ marginTop: 15 }}>
						<button className="primary button ui">确定</button>
					</FormItem>
				</Form>
			</div>
		)
    }
}

export const UserDetailComponent = Form.create()(UserDetailForm);
