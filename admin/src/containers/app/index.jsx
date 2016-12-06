/**
 * 顶级容器
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../actions/';
import {AppComponent} from '../../components/app/index/';

export class AppContainer extends Component {

	render() {
		return (<AppComponent {...this.props}></AppComponent>);
	}

}

function mapStateToProps (state) {
	return state;
}

function mapDispatchToProps (dispatch) {
	return bindActionCreators(
		Object.assign({}, ...Object.keys(actions).map(key => ({[key]: actions[key]}))),
		dispatch
	);
}

export const App = connect(mapStateToProps, mapDispatchToProps)(AppContainer);
