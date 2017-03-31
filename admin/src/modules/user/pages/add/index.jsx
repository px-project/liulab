/**
 * 添加用户界面
 */
import React from 'react';
import { connect } from 'react-redux';
import { xhttp } from '../../../common';
import { UserEdit } from '../../components';
import './style.scss';

class userAddPage extends React.Component {

    componentWillMount() {
        this.props.xhttp.list('role');
    }

    render() {
        let { role, entities } = this.props;
        return (
            <div className="user-add-page page">
                <UserEdit onSubmit={ this.save.bind(this) } entities={ entities } role={ role }></UserEdit>
            </div>
        );
    }

    // 保存
    save(formData) {
        let { xhttp, history } = this.props;
        xhttp.create('user', [], formData).then(result => {
            history.push(`/user/${result._id}`);
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

export const UserAddPage = connect(mapStateToProps, mapDispatchToProps)(userAddPage);
