/**
 * 首页模块容器
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../../../actions';
import { IndexComponent } from '../../components';
import { reduxForm, FieldArray, Field } from 'redux-form';
import { FormInput } from 'semantic-ui-react';

const renderField = ({ input, label, type, meta: { touched, error } }) => (
    <input {...input} type={type} placeholder={label} />
)

const List = ({ fields }) => (
    <ul>
        <li>
            <button type="button" onClick={() => fields.push({})}>Add Member</button>
        </li>
        {fields.map((member, index) =>
            <Field key={index} name={`${member}.firstName`} component={renderField} label="First Name" />
        )}
    </ul>
)


// const renderField = ({ input, type, label }) => (
//     <input {...input} type={type} placeholder={label} />
// )


// const List = ({ fields }) => (
//     <div>
//         {fields.map((field, index) => (
//             <Field key={index} component={renderField} name="name" label="name"></Field>
//         ))}
//         <button type="button" onClick={() => fields.push({})}></button>
//     </div>
// );



@reduxForm({
    form: 'demo'
})
class Demo extends Component {
    render() {
        return (
            <form>
                <FieldArray name="attrs" component={List}></FieldArray>
            </form>
        )
    }
}



class IndexApp extends Component {

    render() {
        return (<Demo></Demo>);
    }

}

function mapStateToProps(state) {
    return state;
}

function mapDispatchToProps(dispatch) {
    return {};
}

export const IndexContainer = connect(mapStateToProps, mapDispatchToProps)(IndexApp);
