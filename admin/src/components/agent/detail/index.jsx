/**
 * 代理商详情组件
 */
import React, {Component} from 'react';
import './style.scss';

export class AgentDetailComponent extends Component {
    componentWillMount () {
        this.props.xhttp('detail', 'agentProduct', [this.props.params.agent_id], {}, true);
    }
    render () {
        return (<h1>Agent detail</h1>);
    }
}