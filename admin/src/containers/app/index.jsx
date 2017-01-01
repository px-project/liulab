/**
 * 顶级容器
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions/';
import { AppComponent } from '../../components/app/index/';

export class AppContainer extends Component {

	render() {
		return (<AppComponent {...this.props}></AppComponent>);
	}

}

function mapStateToProps(state) {
	return state;
}

function mapDispatchToProps(dispatch) {
	let result = {};
	Object.keys(actions).forEach(key => {
		if (typeof actions[key] === 'function') return result[key] = bindActionCreators(actions[key], dispatch);
		result[key] = bindActionCreators(
			Object.assign({}, ...Object.keys(actions[key]).map(ck => ({ [ck]: actions[key][ck] })))
			, dispatch
		);
	});
	return result;
}

export const App = connect(mapStateToProps, mapDispatchToProps)(AppContainer);
