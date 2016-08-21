/**
 * 代理模块容器
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

class AgentContainer extends Component {
	render () {
		return (
			<h1>Agent</h1>
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

	}, dispatch);
}


export const AgentApp = connect(mapStateToProps, mapDispatchToProps)(AgentContainer);
