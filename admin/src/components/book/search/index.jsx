/**
 * 搜索部分组件
 */
import React, {Component} from 'react';
import {Select, Input, Button, Row, Col } from 'antd';
const Option = Select.Option;
const InputGroup = Input.Group;

import './style.scss';


export class SearchComponent extends Component {
    render() {
        return (
            <div className="search-component">
                <div className="search-bar">
                    <Select defaultValue="name" className="search-condition">
                        <Option value="name">产品名</Option>
                        <Option value="_id">货号</Option>
                    </Select>
                    <Input placeholder="请输入关键字" className="search-input" />
                    <Button icon="search" className="search-btn"></Button>
                </div>
                <div>
                </div>
            </div>
        );
    }
}
