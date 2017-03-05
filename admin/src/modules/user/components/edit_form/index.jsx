/**
 * 编辑用户
 */
import React from 'react';
import { Link } from 'react-router';
import { Upload } from '../../../common/';
import { reduxForm, Field } from 'redux-form';
import { Form, Button, ButtonGroup, FormInput, FormSelect } from 'semantic-ui-react';
import './style.scss';

// class editForm extends React.Component {

//     render() {
//         let { role, entities, params, handleSubmit } = this.props, { user_id } = params;

//         let roleOptions = role.items.map((_id, index) => ({ key: index, text: entities[_id].name, value: _id }));

//         return (
//             <Form className="user-edit-form">
//                 <Field component={FormSelect} label="角色" name="role" options={roleOptions}></Field>
//                 <Field component={FormInput} label="姓名" name="name"></Field>
//                 <Field component={FormInput} label="账号" name="username"></Field>
//                 <Field component={FormInput} label="密码" name="password" type="password"></Field>
//                 <Field component={FormInput} label="确认密码" name="pwdrepeat" type="password"></Field>
//                 <Field component={FormInput} label="联系方式" name="phone"></Field>
//                 <ButtonGroup>
//                     <Button primary={true} onClick={handleSubmit}>保存</Button>
//                     <Button>取消</Button>
//                 </ButtonGroup>
//             </Form>
//         );
//     }
// }

const editForm = props => {

    let { role, entities, params, handleSubmit } = props, { user_id } = params;

    let roleOptions = role.items.map((_id, index) => ({ key: index, text: entities[_id].name, value: _id }));

    return (
        <Form className="user-edit-form">
            <Field component={FormSelect} label="角色" name="role" options={roleOptions}></Field>
            <Field component={FormInput} label="姓名" name="name"></Field>
            <Field component={FormInput} label="账号" name="username"></Field>
            <Field component={FormInput} label="密码" name="password" type="password"></Field>
            <Field component={FormInput} label="确认密码" name="pwdrepeat" type="password"></Field>
            <Field component={FormInput} label="联系方式" name="phone"></Field>
            <ButtonGroup>
                <Button primary={true} onClick={handleSubmit}>保存</Button>
                <Button>取消</Button>
            </ButtonGroup>
        </Form>
    );
}

export const EditForm = reduxForm({
    form: 'user_edit'
})(editForm);