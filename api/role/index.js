/**
 * 角色控制器
 */
const _router = require('express').Router();
const xres = require('../common/xres');
const roleModel = require('../common/xmodel')('role');
const xfilter = require('../common/xfilter');
const permissionConfig = require('./permission.json');

module.exports = _router
    // 获取权限配置
    .get('/permission', (req ,res) => {
        res.json(xres({code: 0}, permissionConfig));
    })

    // 角色列表
    .get('/', (req, res) => {
        roleModel.list({}, (result) => {
            res.json(xres({ code: 0 }, xfilter(result, '_id', 'name', 'create_time', 'update_time')));
        });
    })

    // 角色详情
    .get('/:role_id', (req, res) => {
        roleModel.detail(req.params.role_id, [], (result) => {
            res.json(xres({ code: 0 }, xfilter(result, '_id', 'name', 'permission', 'create_time', 'update_time')));
        });
    })

    // 添加角色
    .post('/', (req, res) => {
        let {name, permission} = req.body;

        let newData = { name, permission };

        roleModel.create(newData, (result) => {
            res.json(xres({ code: 0 }, xfilter(result, '_id', 'name', 'permission', 'create_time')));
        });
    })


    // 更新角色
    .patch('/:role_id', (req, res) => {
        let {role_id} = req.params;

    })


    // 删除角色
    .delete('/:role_id', (req, res) => {
        let {role_id} = req.params;
        roleModel.delete(role_id, (result) => {

        })
    });