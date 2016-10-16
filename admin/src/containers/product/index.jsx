/**
 * 产品模块容器
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {xhttp} from '../../actions/xhttp/';
import {selectTemplateId} from '../../actions/';

class ProductContainer extends Component {
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
		selectTemplateId
	}, dispatch);
}


export const ProductApp = connect(mapStateToProps, mapDispatchToProps)(ProductContainer);
