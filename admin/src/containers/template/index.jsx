/**
 * 模板模块容器
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {xhttp, xform} from '../../actions/';

class TemplateContainer extends Component {
	render() {
		return (<div>{React.cloneElement(this.props.children, this.props) }</div>);
	}
}


// 合并state
function mapStateToProps(state) {
	return state;
}

// 合并dispatch
function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		xhttp,
		xform
	}, dispatch);
}

export const TemplateApp = connect(mapStateToProps, mapDispatchToProps)(TemplateContainer);
