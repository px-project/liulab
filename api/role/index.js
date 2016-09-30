/**
 * 角色控制器
 */
const _router = require('express').Router();
const xres = require('../common/xres');
const roleModel = require('../common/xmodel')('role');
const xfilter = require('../common/xfilter');

module.exports = _router

    // 角色列表/详情
    .get('/:role_id?', (req, res) => {
        let {role_id} = req.params;

        if (!role_id) {
            // list
            roleModel.list({}, (result) => {
                res.json(xres({ code: 0 }, xfilter(result, '_id', 'name', 'permission', 'create_time', 'update_time')));
            });
        } else {
            // detail
            roleModel.detail(role_id, {}, (result) => {
                res.json(xres({ code: 0 }, xfilter(result, '_id', 'name', 'permission', 'create_time', 'update_time')));
            });
        }
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
    .patch('/', (req, res) => {

    })


    // 删除角色
    .delete('/', (req, res) => {

    });