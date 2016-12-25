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
		console.log(this.props)
		return (<AppComponent {...this.props}></AppComponent>);
	}

}

function mapStateToProps(state) {
	return state;
}

function mapDispatchToProps(dispatch) {
	let result = bindActionCreators(
		Object.assign({}, ...Object.keys(actions).map(key => ({[key]: actions[key]}))),
		dispatch
	);

	// console.log(bindActionCreators(actions.xhttp, dispatch))
	// return {
	// // 	// actions: Object.assign({}, ...Object.keys(actions).map(key => {
	// // 	// 	if (typeof actions[key] === 'function') return {[key]: bindActionCreators(actions[key], dispatch)};
	// // 	// }))
	// 	actions: {
	// 		xhttp: bindActionCreators(actions.xhttp, dispatch),
	// 		xform: bindActionCreators(actions.xform, dispatch),
	// 		aaa: {
	// 			a: bindActionCreators(actions.xhttp, dispatch),
	// 			b: bindActionCreators(actions.xhttp, dispatch),

	// 		}
	// 	}
	// }

	// console.log(result);
	return result;


}

export const App = connect(mapStateToProps, mapDispatchToProps)(AppContainer);
