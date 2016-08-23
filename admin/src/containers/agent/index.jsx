/**
 * 代理模块容器
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchAgentList} from '../../actions/agent/fetchAgentList';
import {AgentList} from '../../components/agent/list/';


class AgentContainer extends Component {
	render () {
		return (
			<div>
				<AgentList {...this.props}></AgentList>
			</div>
		);
	}
}

// 合并state
function mapStateToProps (state) {
	return state;
}

// 合并dispatch
function mapDispatchToProps (dispatch) {
	return bindActionCreators({
		fetchAgentList
	}, dispatch);
}


export const AgentApp = connect(mapStateToProps, mapDispatchToProps)(AgentContainer);
