/**
 * 用户详情界面
 */
import React from 'react';
import { connect } from 'react-redux';
import { xhttp } from '../../../common/actions';
import { UserDetailComponent } from '../../components';

class userDetailPage extends React.Component {

    componentWillMount() {
        this.props.xhttp.list('role');
    }

    render() {
        return (<UserDetailComponent {...this.props}></UserDetailComponent>);
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
