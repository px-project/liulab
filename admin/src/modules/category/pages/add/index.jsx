/**
 * 添加品类洁面
 */
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { initialize } from 'redux-form';
import { CategoryEdit } from '../../components';
import { INIT_ATTRS } from '../../constants';
import { xhttp, Loader } from '../../../common';

class categoryAddPage extends React.Component {

    componentWillMount() {
        this.props.initialize('category_edit', { attrs: INIT_ATTRS });
    }

    render() {
        let { category } = this.props;
        return (
            <div className="page category-add-page">
                <CategoryEdit onSubmit={ this.createCategory.bind(this) }></CategoryEdit>
            </div>
        );
    }

    createCategory(value) {
        let { xhttp, history } = this.props;
        this.props.xhttp.create('category', [], value).then(result => {
            history.push('/category/' + result._id);
        });
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
