/**
 * login page.
 */
import React from 'react';
import { connect } from 'react-redux';
import { LoginForm } from '../../components';
import { xhttp } from '../../../common';
import './style.scss';

export class loginPage extends React.Component {
    render() {
        let { user_login } = this.props;
        return (
            <div className="login-page page">
                <LoginForm onSubmit={ this.login.bind(this) } loading={ user_login.fetching.create }></LoginForm>
            </div>
        );
    }
    login(data) {
        let { xhttp, history } = this.props;
        xhttp.create('user_login', [], data).then(result => {
            localStorage.setItem('token', result.token);
            history.push('/home');
        });
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

export const LoginPage = connect(mapStateToProps, mapDispatchToProps)(loginPage);