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

	handleSubmit(props, e) {
		e.preventDefault();
		props.xhttp({
			action: 'create',
			api: 'userLogin',
			data: {
				username: 'admin',
				password: 'admin'
			}
		}, () => {
			props.history.pushState(null, '/index');
		});
	}

	render() {
	    const { getFieldProps } = this.props.form;
		return (
			<div>
		    	<Form inline onSubmit={this.handleSubmit.bind(this, this.props)}>
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
