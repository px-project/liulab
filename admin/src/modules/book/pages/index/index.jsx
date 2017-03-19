/**
 * 订购模块容器
 */
import React from 'react';
import { connect } from 'react-redux';
import { BookSelect } from '../../components';
import { xhttp } from '../../../common';

class bookPage extends React.Component {
    componentWillMount() {
        let { xhttp } = this.props;
        xhttp.list('category');
        xhttp.list('product');
    }

    render() {
        return (<BookSelect {...this.props}></BookSelect>);
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

export const BookPage = connect(mapStateToProps, mapDispatchToProps)(bookPage);
