/**
 * 代理模块容器
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {xhttp} from '../../actions/xhttp/';

class AgentContainer extends Component {
	render () {
		return (
			<div>{this.props.children}</div>
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
		xhttp
	}, dispatch);
}


export const AgentApp = connect(mapStateToProps, mapDispatchToProps)(AgentContainer);
