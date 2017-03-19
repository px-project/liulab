/**
 * 品类列表界面
 */
import React from 'react';
import { connect } from 'react-redux';
import { CategoryList } from '../../components';
import { xhttp } from '../../../common/actions';

class categoryPage extends React.Component {

    componentWillMount() {
        this.props.xhttp.list('category');
    }

    render() {
        return (<CategoryList {...this.props}></CategoryList>);
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

export const CategoryPage = connect(mapStateToProps, mapDispatchToProps)(categoryPage);
