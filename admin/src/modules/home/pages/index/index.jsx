/**
 * 首页模块容器
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { IndexComponent } from '../../components';


class homePage extends Component {

    render() {
        return (<div>home page</div>);
    }

}

function mapStateToProps(state) {
    return state;
}

function mapDispatchToProps(dispatch) {
    return {};
}

export const HomePage = connect(mapStateToProps, mapDispatchToProps)(homePage);
