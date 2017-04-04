/**
 * 货单菜单分组组件
 */
import React from 'react';
import { MANIFEST_STATUS } from '../../../../constants';
import { Button } from 'semantic-ui-react';
import { Item } from '../item';
import './style.scss';

export class Group extends React.Component {
    render() {
        let { list, type, actions = [], update } = this.props, status = Object.keys(MANIFEST_STATUS);
        return (
            <div className={ `manifest-menu-${type} menu-sec` }>
                <header>
                    <h3>{ MANIFEST_STATUS[type].name + '订单' }</h3>
                    <div className="actions">
                        { actions.map((action, index) => (
                            <Button className={ `mini ${action.color}` } onClick={ this.update.bind(this, action.status) }></Button>
                        )) }
                    </div>
                </header>
                <ul>
                    { list.map((item, index) => (
                        <Item manifest={ item } key={ index }></Item>
                    )) }
                </ul>
            </div>
        );
    }
}