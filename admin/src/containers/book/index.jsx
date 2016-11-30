/**
 * 订购模块容器
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {xhttp} from '../../actions/xhttp/';
import {changeBookState, selectCategory, selectProductId, addProduct} from '../../actions/book/';



class BookContainer extends Component {
	render() {
		return (<div>{React.cloneElement(this.props.children, this.props) }</div>);
	}
}


function mapStateToProps (state) {
	return state;
}

function mapDispatchToProps (dispatch) {
	return bindActionCreators({
		xhttp,
		changeBookState,
		selectCategory,
		selectProductId,
		addProduct
	}, dispatch);
}


export const BookApp = connect(mapStateToProps, mapDispatchToProps)(BookContainer);
