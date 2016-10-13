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

        return (
			<div>
				<header className="list-header">
					<Link className="ui button primary" to="/template/add">添加</Link>
				</header>
				<table className="ui table">
					<thead>
						<tr>
							<th>序号</th>
							<th>产品类型</th>
							<th>添加人</th>
							<th>创建时间</th>
							<th>操作</th>
						</tr>
					</thead>
					<tbody>
						{template.items.map((template_id, template_index) => (
							<tr key={template_index}>
								<td>{template_index + 1}</td>
								<td>{entities[template_id].name}</td>
								<td>{entities[template_id].user_id}</td>
								<td>{moment(entities[template_id].create_time).format('YYYY-MM-DD hh:mm:ss')}</td>
								<td>
									<Link to={'/template/' + template_id}>详情</Link>
									<Link to={'/template/' + template_id + '/edit'}>编辑</Link>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
        );
    }
}
