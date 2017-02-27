/**
 * 货单菜单分组组件
 */
import React, { Component } from 'react';
import { MANIFEST_STATUS } from '../../../../../../constants';
import { ManifestMenuItemComponent as Item } from '../item';
import './style.scss';

export class ManifestMenuGroupComponent extends Component {
    render() {
        let {list, type, actions = []} = this.props, status = Object.keys(MANIFEST_STATUS);
        return (
            <div className={`manifest-menu-${type} menu-sec`}>
                <header>
                    <h3>{MANIFEST_STATUS[type].name + '订单'}</h3>
                    <div className="actions">
                        {actions.map((action, index) => (
                            <button className={`ui button ${action.color} mini`} onClick={this.handleAction.bind(this, action.status)}></button>
                        ))}
                    </div>
                </header>
                <ul>
                    {list.map((item, index) => (
                        <Item manifest={item} key={index}></Item>
                    ))}
                </ul>
            </div>
        );
    }

    // handle action
    handleAction(status) {
        let {xhttp, list} = this.props;
        xhttp.update('manifest', [list.map(item => item._id).join(','), { status }]).then(result => {

        });
    }
}