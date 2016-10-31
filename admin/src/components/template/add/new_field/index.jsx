/**
 * 新字段组件
 */
import React, { Component } from 'react';
import './style.scss';
import { deepCopy } from '../../../../utils/';

export class TemplateNewFieldComponent extends Component {
    componentWillMount() {

    }

    componentDidMount() {
        $('select.dropdown').dropdown();
        $('.ui.checkbox').checkbox();
    }


    render() {
        let {xform, formData} = this.props;
        return (
            <div className="template-new-field ui form">
                <div className="fields">
                    <div className="field inline">
                        <input type="text" placeholder="请输入字段名" onChange={this.handleChange.bind(this, xform, 'newField.title')} />
                    </div>
                    <div className="field inline">
                        <input type="text" placeholder="请输入数据名" onChange={this.handleChange.bind(this, xform, 'newField.key')} />
                    </div>
                    <div className="field inline">
                        <select className="dropdown" onChange={this.handleChange.bind(this, xform, 'newField.type')}>
                            <option value="">请选择类型</option>
                            <option value="string">文本</option>
                            <option value="number">数字</option>
                            <option value="select">选项</option>
                        </select>
                    </div>
                    <div className="field inline">
                        <div className="ui toggle checkbox">
                            <input type="checkbox" onChange={this.handleChange.bind(this, xform, 'newField.required')} />
                            <label>必填</label>
                        </div>
                    </div>
                    <div className="ui buttons btn-group">
                        <button className="ui button icon primary" onClick={this.addNewField.bind(this, xform, formData)}><i className="icon checkmark"></i></button>
                        <button className="ui button icon red"><i className="icon remove"></i></button>
                    </div>
                </div>
            </div>
        );
    }

    // 处理表单元素变动
    handleChange(xform, field, e) {
        if (e.target.type === 'checkbox') {
            xform(e.target.checked, field);
        } else {
            xform(e.target.value, field);
        }
    }

    addNewField(xform, formData, e) {
        let fields = deepCopy(formData.fields);
        fields.push(deepCopy(formData.newField));
        xform({ fields, newField: { key: '', title: '', type: '', required: false } });
    }
}
