/**
 * view category attr field.
 */
import React from 'react';
import { Table, Icon } from 'semantic-ui-react';

export const ViewFields = ({ category = {} }) => (
    <Table>
        <Table.Header fullWidth>
            <Table.Row>
                <Table.HeaderCell>#</Table.HeaderCell>
                <Table.HeaderCell>字段名</Table.HeaderCell>
                <Table.HeaderCell>数据名</Table.HeaderCell>
                <Table.HeaderCell>字段类型</Table.HeaderCell>
                <Table.HeaderCell>是否必填</Table.HeaderCell>
            </Table.Row>
        </Table.Header>
        <Table.Body>
            {(category.attrs || []).map((attr, index) => (
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
                </Table.Row>
            ))}
        </Table.Body>
    </Table>
);