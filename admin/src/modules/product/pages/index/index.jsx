/**
 * 产品列表界面
 */
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ProductList } from '../../components';
import { xhttp } from '../../../common';

class productPage extends React.Component {

    componentWillMount() {
        let { xhttp } = this.props;
        xhttp.list('category');
        xhttp.list('product');
    }

    render() {
        return (<ProductList {...this.props}></ProductList>);
    }

}

function mapStateToProps(state) {
    return state;
}

function mapDispatchToProps(dispatch) {
    return {
        xhttp: xhttp(dispatch)
    };
}

export const ProductPage = connect(mapStateToProps, mapDispatchToProps)(productPage);
