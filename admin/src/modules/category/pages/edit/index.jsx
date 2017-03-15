/**
 * 编辑品类界面
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { CategoryEdit } from '../../components';

class categoryEditPage extends Component {

    render() {
        return (<CategoryEdit {...this.props}></CategoryEdit>);
    }

}

function mapStateToProps(state) {
    return state;
}

function mapDispatchToProps(dispatch) {
    return {};
}

export const CategoryEditPage = connect(mapStateToProps, mapDispatchToProps)(categoryEditPage);