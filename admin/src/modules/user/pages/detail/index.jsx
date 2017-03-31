/**
 * 用户详情界面
 */
import React from 'react';
import { connect } from 'react-redux';
import { xhttp, Loader } from '../../../common';
import { UserDetail } from '../../components';

class userDetailPage extends React.Component {

    componentWillMount() {
        let { match, xhttp } = this.props, { user_id } = match.params;
        xhttp.detail('user', [user_id]);
    }

    render() {
        let { xhttp, user, entities } = this.props;
        return (
            <Loader loading={ user.fetching.detail } className="page user-detail-page">
                <UserDetail user={ entities[user.detail] }></UserDetail>
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

export const UserDetailPage = connect(mapStateToProps, mapDispatchToProps)(userDetailPage);
