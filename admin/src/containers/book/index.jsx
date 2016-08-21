/**
 * 订购模块容器
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';


class BookContainer extends Component {
	render () {
		return (
			<h1>Book</h1>
		);
	}
}

export const BookApp = connect()(BookContainer);
