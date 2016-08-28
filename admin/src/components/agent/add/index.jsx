import React, {Component} from 'react';
import {Button, Form, Input} from 'antd';
let FormItem = Form.Item;


export class AgentAddComponent extends Component {
	render () {
		let formItemLayout = {
			labelCol: {span: 2, offset: 6},
			wrapperCol: {span: 6},
			style: {marginTop: 15}
		};
		return (
			<div>
				<Form>
					<FormItem label="名称" {...formItemLayout}>
						<Input></Input>
					</FormItem>
					<FormItem label="联系人" {...formItemLayout}>
						<Input></Input>
					</FormItem>
					<FormItem label="联系电话" {...formItemLayout}>
						<Input></Input>
					</FormItem>
					<FormItem label="地址" {...formItemLayout}>
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
