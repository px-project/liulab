/**
 * 添加品类洁面
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { initialize } from 'redux-form';
import { CategoryEdit } from '../../components';
import { INIT_ATTRS } from '../../constants';
import { xhttp } from '../../../common';

class categoryAddPage extends Component {

    componentWillMount() {
        this.props.initialize('category_edit', { attrs: INIT_ATTRS });
    }

    render() {
        return (<CategoryEdit onSubmit={this.createCategory.bind(this)}></CategoryEdit>);
    }

    createCategory(value) {
        this.props.xhttp.create('category', [], value)
            .then();
    }


}

function mapStateToProps(state) {
    return state;
}

function mapDispatchToProps(dispatch) {
    return {
        initialize: bindActionCreators(initialize, dispatch),
        xhttp: xhttp(dispatch)
    };
}

export const CategoryAddPage = connect(mapStateToProps, mapDispatchToProps)(categoryAddPage);
