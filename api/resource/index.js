/**
 * 资源处理
 */

const express = require('express');
const _router = express.Router();
const resourceActions = require('./actions');
const xlsx = require('xlsx');
const multer = require('multer');
const upload = multer({dest: './uploads/'});

// 获取资源
_router.get('/:resource_id',(req, res) => {
    let {resource_id} = req.params;
    resourceActions.detail(resource_id, {}, (result) => {
        if (result.type === 'json') {
            res.json(xres({CODE: 0}, result));
        }
        // if (result.type === '') {

        // }
    });
});

// 上传资源
_router.post('/', upload.array(), (req, res) => {
    console.log(req.files);
});

module.exports = _router;