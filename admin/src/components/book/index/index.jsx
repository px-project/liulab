/**
 * 订购列表组件
 */
import React, {Component} from 'react';
import {UploadComponent as Upload} from '../upload/';
import {ConfirmComponent as Confirm} from '../confirm/';
import './style.scss';

export class BookComponent extends Component {
	componentWillReceiveProps (nextProps) {
		let currentFilename = this.props.resource.items[0].filename;
		let nextFilename = nextProps.resource.items[0].filename;

		if (nextFilename) {
			this.props.changeBookState('confirm');
		}
	}


    render () {
    	// this.props.changeBookState('confirm');
        return (
            <div>
                {this.props.bookPageState === 'upload' ? (<Upload {...this.props}></Upload>): ''}
                {this.props.bookPageState === 'confirm' ? (<Confirm {...this.props}></Confirm>) : ''}
            </div>
        );
    }
}
