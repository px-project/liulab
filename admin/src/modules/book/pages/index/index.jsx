/**
 * 订购模块容器
 */
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { BookShopping } from '../../components';
import { xhttp } from '../../../common';
import { BookProductAdd } from '../../actions';

class bookPage extends React.Component {
    componentWillMount() {
        let { xhttp } = this.props;
        xhttp.list('category');
        xhttp.list('product');
    }

    render() {
        return (<BookShopping {...this.props}></BookShopping>);
    }
}

function mapStateToProps(state) {
    return state;
}

function mapDispatchToProps(dispatch) {
    return {
        xhttp: xhttp(dispatch),
        addProduct: bindActionCreators(BookProductAdd, dispatch)
    };
}

export const BookPage = connect(mapStateToProps, mapDispatchToProps)(bookPage);
