/**
 * 编辑品类界面
 */
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { CategoryEdit } from '../../components';
import { xhttp, Loader } from '../../../common';
import { initialize } from 'redux-form';

class categoryEditPage extends React.Component {
    componentWillMount() {
        let { xhttp, category, match, initialize, entities } = this.props;
        if (!category.detail) {
            xhttp.detail('category', [match.params.category_id]).then(result => {
                initialize('category_edit', result);
            });
        } else {
            initialize('category_edit', entities[category.detail]);
        }
    }
    render() {
        let { category } = this.props;
        return (
            <Loader className="category-edit-page page" loading={ category.fetching.detail }>
                <CategoryEdit onSubmit={ this.updateCategory.bind(this) }></CategoryEdit>
            </Loader>
        );
    }

    updateCategory(data) {
        let { xhttp, history } = this.props;
        xhttp.update('category', [data._id], data).then(result => {
            history.push(`/category/${data._id}`);
        });
    }

}

function mapStateToProps(state) {
    return state;
}

function mapDispatchToProps(dispatch) {
    return {
        xhttp: xhttp(dispatch),
        initialize: bindActionCreators(initialize, dispatch)
    };
}

export const CategoryEditPage = connect(mapStateToProps, mapDispatchToProps)(categoryEditPage);