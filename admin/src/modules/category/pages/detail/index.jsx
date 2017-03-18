/**
 * 品类详情界面
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { xhttp } from '../../../common/actions';
import { CategoryDetail } from '../../components';

class categoryDetailPage extends Component {

    componentWillMount() {
        let { params, xhttp } = this.props;
    }

    render() {
        return (<CategoryDetail {...this.props}></CategoryDetail>);
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

export const CategoryDetailPage = connect(mapStateToProps, mapDispatchToProps)(categoryDetailPage);
