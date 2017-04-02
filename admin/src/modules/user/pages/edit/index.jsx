/**
 * 编辑用户界面
 */
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { UserEdit } from '../../components';
import { Loader, xhttp } from '../../../common';
import { initialize } from 'redux-form';

class userEditPage extends React.Component {

    componentWillMount() {
        let { xhttp, user, match, initialize } = this.props;

        const { user_id } = match.params;
        if (user_id !== user.detail) {
            xhttp.list('role');
            xhttp.detail('user', [user_id]).then(result => {
                initialize('user_edit', result);
            });
        }
    }

    render() {
        let { user, role } = this.props;
        return (
            <Loader className="page user-edit-page" loading={ user.fetching.detail || role.fetching.list }>
                <UserEdit onSubit={ this.updateUser.bind(this) }></UserEdit>
            </Loader>
        )
    }

    updateUser(data) {
        let { xhttp, history } = this.props;
        xhttp.update('user', [data._id], data).then(result => {
            history.push(`/user/${data._id}`);
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

export const UserEditPage = connect(mapStateToProps, mapDispatchToProps)(userEditPage);
