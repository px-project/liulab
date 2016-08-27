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
		let {agent, entities} = this.props;
		return (
			<div>
				<ListHeader {...this.props}></ListHeader>
				<div className="agent-list">
					<Row gutter={24}>
			      	{
						  agent.items.map((agent_id, index) => {
							return (
						      	<Col span={6} key={index}>
						        	<Link to={"/agent/" + agent_id}>
						        		<Card>
											<div className="cover">

											</div>
											<div>
												<h3>{entities.agent[agent_id].name}</h3>
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
