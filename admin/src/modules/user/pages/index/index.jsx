/**
 * 订单模块容器
 */
import React from 'react';
import { connect } from 'react-redux';
import { UserList } from '../../components';
import { xhttp } from '../../../common/actions';

class userPage extends React.Component {

    componentWillMount() {
        let { xhttp } = this.props;
        xhttp.list('role');
        xhttp.list('user');
    }

    render() {
        return (<UserList {...this.props}></UserList>);
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

export const UserPage = connect(mapStateToProps, mapDispatchToProps)(userPage);
