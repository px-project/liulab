/**
 * 登录容器
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { Form, Input, Button, Checkbox } from 'antd';
import {xhttp} from '../../actions/xhttp/';
const FormItem = Form.Item;
import './style.scss';

class Login extends Component {

	handleSubmit(e) {
		e.preventDefault();
		console.log('收到表单值：', this.props.form.getFieldsValue());
	}

	render() {
	    const { getFieldProps } = this.props.form;
		return (
			<div>
		    	<Form inline onSubmit={this.handleSubmit}>
		    		<FormItem label="账户">
		        		<Input placeholder="请输入账户名" {...getFieldProps('userName')} defaultValue="admin"/>
		        	</FormItem>
		        	<FormItem label="密码">
		          		<Input type="password" placeholder="请输入密码" {...getFieldProps('password')} defaultValue="admin"/>
			        </FormItem>
			        <Button type="primary" htmlType="submit">登录</Button>
				</Form>
			</div>
		);
	}
}

const LoginContainer = Form.create()(Login);


// 合并state
function mapStateToProps(state) {
	return state;
}

// 合并dispatch
function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		xhttp
	}, dispatch);
}

export const LoginApp = connect(mapStateToProps, mapDispatchToProps)(LoginContainer);
