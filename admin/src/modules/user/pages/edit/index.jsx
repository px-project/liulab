/**
 * 编辑用户界面
 */
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { EditForm } from '../../components';
import { Loader, xhttp } from '../../../common';
import { initialize } from 'redux-form';

class userEditPage extends React.Component {

    componentWillMount() {
        let { xhttp, params } = this.props;
        // console.log(this.props)
        xhttp.list('role');
        xhttp.detail('user', [params.user_id]).then(result => this.props.initialize('user_edit', result));
        // this.props.dispatch(initialize('user_edit', { name: 'asdasdas' }));
        // this.props.initialize('user_edit', { name: 'asdasd' })
    }

    componentDidMount() {
        // this.props.dispatch(initialize('user_edit',{name: 'asdasdas'}));
    }

    render() {
        let { user } = this.props;
        return (
            <EditForm {...this.props}></EditForm>
        )
    }

}

function mapStateToProps(state) {
    // state.initialValues = { name: 'asdasd', username: 'asdasdsa' };
    return state;
}

function mapDispatchToProps(dispatch) {
    return {
        xhttp: xhttp(dispatch),
        dispatch,
        initialize: bindActionCreators(initialize, dispatch)
    };
}

export const UserEditPage = connect(mapStateToProps, mapDispatchToProps)(userEditPage);
