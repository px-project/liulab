/**
 * 头部用户组件
 */
import React, { Component } from 'react';
import './style.scss';

export class AppHeaderUserComponent extends Component {

    render() {

        let {xhttp, user_current, entities} = this.props;
        let currentUser = entities[user_current.items[0]];

        return (
            <div className="header-user">
                {currentUser ? (
                    <p className="user">
                        <a href="#" className="avatar">
                            {currentUser ? (<img src={`${window.server}/resource/${currentUser._id}`} />) : ''}
                        </a>
                        <span className="name">{currentUser.username}</span>
                    </p>
                ) : ''}
                <p className="sign-out">
                    <a onClick={this.logout.bind(this)}><i className="fa fa-sign-out"></i></a>
                </p>
            </div>
        );
    }

    logout() {
        this.props.xhttp.list('userLogout', [], {}, () => {
            window.location.href = '/logout.html';
        });
    }
}