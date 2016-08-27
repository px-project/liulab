/**
 * 代理模块容器
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {xhttp} from '../../actions/xhttp/';
import {AgentComponent, AgentDetailComponent, AgentProductComponent, AgentProductDetailComponent} from '../../components/agent/';

class AgentContainer extends Component {
	componentWillMount () {
		console.log(this.props);
	}
	render () {
		return (<div>{React.cloneElement(this.props.children, this.props)}</div>);
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
