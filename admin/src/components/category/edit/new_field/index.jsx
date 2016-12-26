/**
 * 新字段组件
 */
import React, { Component } from 'react';
import './style.scss';
const _ = require('lodash');

export class TemplateNewFieldComponent extends Component {
    componentWillMount() {

    }

    componentDidUpdate () {
        $(this.refs.dropdown).dropdown();
        $(this.refs.checkbox).checkbox();
    }


    render() {
        let {xform, formData} = this.props;
        return (
            <div className="category-new-field ui form">
                <div className="new-field-sec new-field-basic">
                    <div className="field inline field-new-title">
                        <label>字段名</label>
                        <input type="text" value={formData.newField.title} onChange={this.handleChange.bind(this, 'newField.title')} />
                    </div>
                    <div className="field inline field-required">
                        <div className="ui toggle checkbox">
                            <label>必填</label>
                            <input type="checkbox" ref="checkbox" value={formData.newField.attr_required} onChange={this.handleChange.bind(this, 'newField.required')} />
                        </div>
                    </div>
                </div>
                <div className="new-field-sec new-field-other">
                    <div className="field inline field-new-key">
                        <label>数据名</label>
                        <input type="text" value={formData.newField.key} onChange={this.handleChange.bind(this, 'newField.key')} />
                    </div>
                    <div className="field inline">
                        <label>字段类型</label>
                        <select className="ui dropdown" ref="dropdown" value={formData.newField.attr_type} onChange={this.handleChange.bind(this, 'newField.type')}>
                            <option value="">请选择类型</option>
                            <option value="string">文本</option>
                            <option value="number">数字</option>
                            <option value="select">选项</option>
                        </select>
                    </div>
                    <div className="ui buttons btn-group actions">
                        <button className="ui button icon primary" onClick={this.addNewField.bind(this, formData)}><i className="icon checkmark"></i></button>
                        <button className="ui button icon red"><i className="icon remove"></i></button>
                    </div>
                </div>
            </div>
        );
    }

    // 处理表单元素变动
    handleChange(field, e) {
        if (e.target.type === 'checkbox') {
            this.props.xform(e.target.checked, field);
        } else {
            this.props.xform(e.target.value, field);
        }
    }

    // 保存新字段
    addNewField(formData, e) {
        let fields = _.cloneDeepWith(formData.fields);
        fields.push(_.cloneDeepWith(formData.newField));
        this.props.xform(fields, 'fields');
        this.props.xform({ key: '', title: '', attr_type: 'string', attr_required: false }, 'newField');
    }
}
