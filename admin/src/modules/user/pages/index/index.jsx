/**
 * 订单模块容器
 */
import React from 'react';
import { connect } from 'react-redux';
import { UserComponent } from '../../components';
import { xhttp } from '../../../common/actions';

class userPage extends React.Component {

    componentWillMount() {
        let { xhttp } = this.props;
        xhttp.list('role');
        xhttp.list('user');
    }

    render() {
        return (<UserComponent {...this.props}></UserComponent>);
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
