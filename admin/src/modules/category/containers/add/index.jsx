/**
 * 添加品类洁面
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { initialize } from 'redux-form';
import { CategoryEdit } from '../../components';
import { INIT_ATTRS } from '../../constants';

class categoryAddContainer extends Component {

    componentWillMount() {
        this.props.initialize('category_edit', { attrs: INIT_ATTRS });
    }

    render() {
        return (<CategoryEdit></CategoryEdit>);
    }

}

function mapStateToProps(state) {
    return state;
}

function mapDispatchToProps(dispatch) {
    return {
        initialize: bindActionCreators(initialize, dispatch)
    };
}

export const CategoryAddContainer = connect(mapStateToProps, mapDispatchToProps)(categoryAddContainer);
