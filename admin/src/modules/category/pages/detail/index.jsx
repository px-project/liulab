/**
 * 品类详情界面
 */
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { xhttp, Loader } from '../../../common';
import { CategoryDetail } from '../../components';

class categoryDetailPage extends React.Component {

    componentWillMount() {
        let { match, xhttp, category } = this.props, { category_id } = match.params;
        if (category_id !== category.detail) {
            xhttp.detail('category', [match.params.category_id]);
        }
    }

    render() {
        let { category, entities } = this.props;
        return (
            <Loader className="category-detail-page page" loading={ category.fetching.detail }>
                <CategoryDetail {...this.props} detail={ entities[category.detail] }></CategoryDetail>
            </Loader>
        );
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
