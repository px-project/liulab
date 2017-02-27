/**
 * 新字段组件
 */
import React, { Component } from 'react';
import { FormGroup, FormToggle } from '../../../../common/';
import { NEW_ATTRS } from '../../../../../constants/';
import * as _ from 'lodash';
import './style.scss';

export class TemplateNewFieldComponent extends Component {
    componentWillMount() {

    }

    componentDidUpdate() {
        $(this.refs.dropdown).dropdown();
        $(this.refs.checkbox).checkbox();
    }


    render() {
        let {xform, formData} = this.props, {new_attr = {}} = formData;
        return (
            <div className="category-new-field ui form">
                <div className="new-field-sec new-field-basic">
                    <FormGroup className="field-new-title" label="字段名">
                        <input type="text" value={new_attr.title} onChange={xform.change.bind(this, 'new_attr.title')} />
                    </FormGroup>
                    <FormGroup className="field-required" label="必填">
                        <FormToggle value={new_attr.attr_required} onChange={xform.change.bind(this, 'new_attr.attr_required')}></FormToggle>
                    </FormGroup>
                </div>
                <div className="new-field-sec new-field-other">
                    <FormGroup label="数据名" className="field-new-key">
                        <input type="text" value={new_attr.key} onChange={xform.change.bind(this, 'new_attr.key')} />
                    </FormGroup>
                    <FormGroup label="字段类型">
                        <select className="ui dropdown" ref="dropdown" value={new_attr.attr_type} onChange={xform.change.bind(this, 'new_attr.attr_type')}>
                            <option value="">请选择类型</option>
                            <option value="string">文本</option>
                            <option value="number">数字</option>
                            <option value="select">选项</option>
                        </select>
                    </FormGroup>
                    <div className="ui buttons btn-group actions">
                        <button className="ui button icon primary" onClick={this.addNewField.bind(this)}><i className="icon checkmark"></i></button>
                        <button className="ui button icon red"><i className="icon remove"></i></button>
                    </div>
                </div>
            </div>
        );
    }

    // 保存新字段
    addNewField() {
        let {xform, formData} = this.props, {attrs, new_attr} = formData;
        attrs.push(new_attr);
        xform.change('attrs', attrs);
        xform.change('new_attr', NEW_ATTRS);
    }
}
