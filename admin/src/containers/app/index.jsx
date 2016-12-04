/**
 * 顶级容器
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../actions/';
import {Header, Sidebar} from '../../components/app/';
import './style.scss';

export class AppContainer extends Component {

	render() {
		return (
			<div className="container">
				<Sidebar {...this.props}></Sidebar>
				<div id="main">
					<Header {...this.props}></Header>
					<div className="page">
						{React.cloneElement(this.props.children, this.props)}
					</div>
				</div>
			</div>
		);
	}

}

function mapStateToProps (state) {
	return state;
}

function mapDispatchToProps (dispatch) {
	return bindActionCreators(Object.assign({}, ...Object.keys(actions).map(key => ({[key]: actions[key]}))), dispatch);
}

export const App = connect(mapStateToProps, mapDispatchToProps)(AppContainer);
