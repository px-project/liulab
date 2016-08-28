/**
 * 用户详情组件
 */
import React, {Component} from 'react';
import './style.scss';
import {Form, Button, Input, Select} from 'antd';
let FormItem = Form.Item;
let Option = Select.Option;

export class UserDetailComponent extends Component  {
	componentWillMount () {
		this.props.xhttp('list', 'role', [], {}, false);
	}

    render () {
		let formItemLayout = {
			labelCol: {span: 2, offset: 6},
			wrapperCol: {span: 6},
			style: {marginTop: 15}
		};
		return (
			<div>
				<Form>
					<FormItem label="姓名" {...formItemLayout}>
						<Input></Input>
					</FormItem>
					<FormItem label="角色" {...formItemLayout}>
						<Select>
							{
								this.props.role.items.map((item, index) => {
									return (
										<Option key={index} value={item._id}>{item.name}</Option>
									)
								})
							}
						</Select>
					</FormItem>
					<FormItem label="账号" {...formItemLayout}>
						<Input></Input>
					</FormItem>
					<FormItem label="密码" {...formItemLayout}>
						<Input></Input>
					</FormItem>
					<FormItem label="确认密码" {...formItemLayout}>
						<Input></Input>
					</FormItem>
					<FormItem label="联系方式" {...formItemLayout}>
						<Input></Input>
					</FormItem>
					<FormItem wrapperCol={{ span: 16, offset: 8 }} style={{ marginTop: 15 }}>
						<Button type="primary" htmlType="submit">确定</Button>
					</FormItem>
				</Form>
			</div>
		)
    }
}
