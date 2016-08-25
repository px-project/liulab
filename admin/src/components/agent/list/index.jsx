/**
 * 代理商列表组件
 */
import React, {Component} from 'react';
import {ListHeader} from '../../common/list_header/';
import {Link} from 'react-router';
import {Card, Row, Col} from 'antd';
import moment from 'moment';
import './style.scss';


export class AgentList extends Component {
	componentWillMount () {
		this.props.xhttp('list', 'agent', [], {}, true);
	}
	render () {
		let {agentList} = this.props;
		return (
			<div>
				<ListHeader></ListHeader>
				<div className="agent-list">
					<Row gutter={24}>
			      	{
			      		agentList.map((agent, index) => {
							return (
						      	<Col span={6} key={index}>
						        	<Link to={"/agent/" + agent._id}>
						        		<Card>
											<div className="cover">

											</div>
											<div>
												<h3>{agent.name}</h3>
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
