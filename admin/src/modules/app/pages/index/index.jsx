/**
 * 顶级容器
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AppComponent } from '../../components';
import { xhttp } from '../../../common/actions';

class appPage extends Component {
    componentWillMount() {
        // this.props.xhttp.detail('user_current', [], {});
    }

    render() {
        return (
            <AppComponent {...this.props}></AppComponent>
        );
    }

}

function mapStateToProps(state) {
    return state;
}

function mapDispatchToProps(dispatch) {
    return {
        xhttp
    };
}

export const AppPage = connect(mapStateToProps, mapDispatchToProps)(appPage);
