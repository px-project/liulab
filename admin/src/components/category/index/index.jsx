/**
 * 品类列表组件
 */
import React, {Component} from 'react';
import moment from 'moment';
import {Row, Col, Table, Button} from 'antd';
import {Link} from 'react-router';
import * as consts from '../../../constants/';
import './style.scss';

export class CategoryComponent extends Component  {

	componentWillMount () {
		this.props.xhttp({
			action: 'list',
			api: 'category',
			reload: true
		});
	}

    render () {
    	let {entities, category} = this.props;

        return (
			<div>
				<header className="list-header">
					<Link className="ui button primary" to="/category/add">添加</Link>
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
						{category.items.map((category, category_index) => (
							<tr key={category_index}>
								<td>{category_index + 1}</td>
								<td>{entities[category].name}</td>
								<td>{entities[category].user_id}</td>
								<td>{moment(entities[category].create_time).format('YYYY-MM-DD hh:mm:ss')}</td>
								<td>
									<Link to={'/template/' + category}>详情</Link>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
        );
    }
}
