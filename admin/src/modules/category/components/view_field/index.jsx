/**
 * view category attr field.
 */
import React from 'react';
import { Table, Icon } from 'semantic-ui-react';

export default (attr, index, attrs) => (
    <Table.Row key={index}>
        <Table.Cell>{index + 1}</Table.Cell>
        <Table.Cell>
            <span className="value">{attr.title}</span>
        </Table.Cell>
        <Table.Cell>
            <span className="value">{attr.key}</span>
        </Table.Cell>
        <Table.Cell>
            <span className="value">{attr.attr_type}</span>
        </Table.Cell>
        <Table.Cell>
            <span className="value">
                {attr.attr_required ? (<Icon name='checkmark' color="green" />) : (<Icon name='close' color="red" />)}
            </span>
        </Table.Cell>
        <Table.Cell>
            <a>编辑</a>
            <a>移除</a>
        </Table.Cell>
    </Table.Row>
)