/**
 * 选择产品预定
 */
import React, { Component } from 'react';
import './style.scss';
import { BookSelectConfirmComponent as Confirm } from '../confirm/';
import { BookSelectSelectComponent as Select } from '../select/';

export class BookSelectComponent extends Component {
	componentWillMount() {
		this.props.changeBookState('select');
	}


	render() {
		let {changeBookState, bookPageState} = this.props;
		let status = bookPageState.pageState;

		return (
			<div>
				{status === 'confirm' && <Confirm {...this.props}></Confirm>}
				{status === 'select' && <Select {...this.props}></Select>}
			</div>
		);
	}
}
