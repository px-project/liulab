/**
 * 品类常量
 */

// 新品类初始属性
export const INIT_ATTRS = [
    { key: 'name', title: '产品名称', attr_type: 'string', attr_required: true },
    { key: 'code', title: '编号', attr_type: 'string', attr_required: false },
    { key: 'unit_price', title: '单价(元)', attr_type: 'number', attr_required: true },
    { key: 'num', title: '数量', attr_type: 'number', attr_required: true }
];

// 新属性默认值
export const NEW_ATTRS = { key: '', title: '', attr_type: '', attr_required: false };

// 字段类型
export const ATTR_TYPE = [
    {key: 0, text: '文字', value: 'string'},
    {key: 1, text: '数字', value: 'number'},
    {key: 2, text: '选项', value: 'select'}
]