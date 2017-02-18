/**
 * 头部用户组件
 */
import React, { Component } from 'react';
import { Image } from '../../../common/';
import './style.scss';

export class AppHeaderUserComponent extends Component {

    render() {

        let {xhttp, user_current, entities} = this.props;
        let currentUser = entities[user_current.detail] || {};

        return (
            <div className="header-user">
                <div className="info">
                    <Image className="avatar" type="USER_AVATAR" link_id={currentUser._id}></Image>
                    <span className="name">{currentUser.username}</span>
                </div>
                <div className="actions">
                    <a onClick={this.logout.bind(this)}><i className="fa fa-sign-out"></i></a>
                </div>
            </div>
        );
    }

    logout() {
        this.props.xhttp.list('userLogout', [], {}, () => {
            window.location.href = '/logout.html';
        });
    }
}