/**
 * 代理商列表组件
 */
import React, {Component} from 'react';
import {ListHeader} from '../../common/list_header/';
import {Link} from 'react-router';
import {Card, Row, Col} from 'antd';
import moment from 'moment';
import './style.scss';


export class AgentComponent extends Component {
	componentWillMount () {
		this.props.xhttp('list', 'agent', [], {}, true);
	}
	render () {
		let {agent} = this.props;
		return (
			<div>
				<ListHeader {...this.props}></ListHeader>
				<div className="agent-list">
					<Row gutter={24}>
			      	{
						  agent.items.map((item, index) => {
							return (
						      	<Col span={6} key={index}>
						        	<Link to={"/agent/" + item._id}>
						        		<Card>
											<div className="cover">

											</div>
											<div>
												<h3>{item.name}</h3>
											</div>
										</Card>
						        	</Link>
						      	</Col>
						    );
			      		})
			      	}
				    </Row>
				</div>
			</div>
		);
	}
}
