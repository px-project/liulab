/**
 * 用户详情界面
 */
import React from 'react';
import { connect } from 'react-redux';
import { xhttp } from '../../../common/actions';
import { UserDetail } from '../../components';

class userDetailPage extends React.Component {

    componentWillMount() {
        let { match, xhttp } = this.props, { user_id } = match.params;
        xhttp.detail('user', [user_id]);
    }

    render() {
        return (<UserDetail {...this.props}></UserDetail>);
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

export const UserDetailPage = connect(mapStateToProps, mapDispatchToProps)(userDetailPage);
