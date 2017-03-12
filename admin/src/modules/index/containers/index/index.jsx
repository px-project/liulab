/**
 * 首页模块容器
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../../../actions';
import { IndexComponent } from '../../components';
import {reduxForm, Field} from 'redux-form';

@reduxForm({
    form: 'demo'
})
class Demo extends Component {
    render () {
        return (
            <form>
                <Field component="input" label="name" name="name"></Field>
            </form>
        )
    }
}

class IndexApp extends Component {

    render() {
        return (<Demo></Demo>);
    }

}

function mapStateToProps(state) {
    return state;
}

function mapDispatchToProps(dispatch) {
    return {};
}

export const IndexContainer = connect(mapStateToProps, mapDispatchToProps)(IndexApp);
