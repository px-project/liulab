/**
 * 角色控制器
 */
const express = require('express');
const _router = express.Router();
const xres = require('../common/xres');
const roleModelActions = require('./actions');


// 角色列表/详情
_router.get('/:role_id?',(req, res) => {
    let {role_id} = req.params;

    if (!role_id) {
        // list
        // let {} = req.query;

        roleModelActions.list({}, (result) => {
            let resData = result.map((item) => {
                return {
                    _id: item._id,
                    name: item.name,
                    permission: item.permission,
                    create_time: item.create_time,
                    update_time: item.update_time
                };
            });

            res.json(xres({CODE: 0}, resData));
        });
    } else {
        // detail
        roleModelActions.detail(role_id, {}, (result) => {
            let resData = {
                _id: result._id,
                name: result.name,
                permission: result.permission,
                create_time: result.create_time,
                update_time: result.update_time
            };

            res.json(xres({CODE: 0}, resData));
        })
    }
});

// 添加角色
_router.post('/', (req, res) => {
    let {name, permission} = req.body;

    let newData = {name, permission};

    roleModelActions.create(newData, (result) => {
        let resData = {
            _id: result._id,
            name: result.name,
            permission: result.permission,
            create_time: result.create_time
        };
        res.json(xres({CODE: 0}, resData));
    });
});

// 更新角色
_router.patch('/', (req, res) => {

});

// 删除角色
_router.delete('/', (req, res) => {

});

module.exports = _router;