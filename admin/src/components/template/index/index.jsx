/**
 * 模板列表组件
 */
import React, {Component} from 'react';
import moment from 'moment';
import {Row, Col, Table, Button} from 'antd';
import {Link} from 'react-router';
import * as consts from '../../../constants/';
import './style.scss';

export class TemplateComponent extends Component  {

	componentWillMount () {
		this.props.xhttp({
			action: 'list',
			api: 'template',
			reload: true
		});
	}

    render () {
    	let {entities, template} = this.props;

		let columns = [
			{
				title: '序号',
				key: 'index',
				render: (text, record, index) => {
					return index + 1;
				}
			},
			{
				title: '产品类型',
				key: 'name',
				render: (text, record, index) => {
					return entities[record].name;
				}
			},
			{
				title: '添加人',
				key: 'user_id',
				render: (text, record, index) => {
					return entities[record].user_id;
				}
			},
			{
				title: '创建时间',
				key: 'create_time',
				render: (text, record, index) => {
					return moment(entities[record].create_time).format('YYYY-MM-DD hh:mm:ss');
				}
			},
			{
				title: '操作',
				ket: 'action',
				render: (text, record, index) => {
					return (
						<div>
							<Link to={'/template/' + record}>详情</Link>
							<Link to={'/template/' + record + '/edit'}>编辑</Link>
							<Link to={'/template/' + record}>删除</Link>
						</div>
					);
				}
			}
		];

        return (
			<div>
				<header className="list-header">
					<div>
						<Link className="ui button primary" to="/template/add">添加</Link>
					</div>
				</header>
				<Table columns={columns} dataSource={template.items}></Table>
			</div>
        );
    }
}
