/**
 * 列表页面头部组件
 */
import React, {Component} from 'react';
import {Row, Col, Button, Input} from 'antd';
import {Link} from 'react-router';
const InputGroup = Input.Group;

import './style.scss';

export class ListHeader extends Component {

	render () {
		return (
			<header className="list-header">
				<Row justify="end">
					<Col span={12}>
						<Button type="primary"><Link to={location.pathname + '/add'}>添加</Link></Button>
					</Col>
					<Col span={8}></Col>
					<Col span={4}>
					{/**
						<div className="search ant-search-input-wrapper">
					        <InputGroup className="ant-search-input">
					          <Input placeholder="请输入关键字" />
					          <div className="ant-input-group-wrap">
					            <Button icon="search" className="ant-search-btn" />
					          </div>
					        </InputGroup>
						</div>
					*/}
					</Col>
				</Row>

			</header>
		);
	}


}
