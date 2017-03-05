/**
 * 添加用户界面
 */
import React from 'react';
import { connect } from 'react-redux';
import { xhttp } from '../../../common/actions';
import { EditForm } from '../../components';

class userAddPage extends React.Component {

    componentWillMount() {
        this.props.xhttp.list('role');
    }

    render() {
        return (
            <div className="user-add-page page">
                <EditForm onSubmit={this.save.bind(this)} {...this.props}></EditForm>
            </div>
        )
    }

    // 保存
    save(formData) {
        let { xhttp, history } = this.props;
        xhttp.create('user', [], formData).then(result => {
            history.pushState(null, `/user/${result._id}`);
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
