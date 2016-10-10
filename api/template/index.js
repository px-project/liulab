/**
 * 产品类型字段模板
 */
const _router = require('express').Router();
const templateModel = require('../common/xmodel')('template');
const xres = require('../common/xres');
const xfilter = require('../common/xfilter');
const async = require('async');
const utils = require('../common/utils');
const multer = require('multer');
const upload = multer({ dest: './uploads/' });
const fs = require('fs');


module.exports = _router

    // 列表
    .get('/', (req, res) => {
        let condition = {};
        templateModel.list(condition, (result) => {
            res.json(xres({ code: 0 }, xfilter(result, '_id', 'name', 'user_id', 'create_time', 'update_time')));
        });
    })


    // 详情
    .get('/:template_id', (req, res) => {
        let {template_id} = req.params;
        templateModel.detail(template_id, {}, (result) => {
            res.json(xres({ code: 0 }, xfilter(result, '_id', 'name', 'user_id', 'template', 'create_time', 'update_time')));
        });
    })


    // 添加
    .post('/', (req, res) => {
        let newData = xfilter(req.body, 'name', 'template');
        templateModel.create(newData, (result) => {
            res.json(xres({ code: 0 }, xfilter(result, '_id', 'create_time')));
        });
    })


    // 修改
    .patch('/:template_id', (req, res) => {
        let {template_id} = req.params;

        let newData = xfilter(req.body, 'name', 'template');
        newData.update_time = Date.now();

        templateModel.update(template_id, newData, (result) => {
            res.json(xres({ code: 0 }, { _id, update_time: newData.update_time }));
        })
    })


    // 删除
    .delete('/:template_id', (req, res) => {
        let {template_id} = req.params;

        templateModel.delete(template_id, (result) => {
            res.json(xres({ code: 0 }));
        });
    })

    // 解析模板文件
    .post('/upload', upload.single('file'), (req, res) => {
        let result = utils.decodeXlsx(req.file.path);

        // 删除文件
        fs.unlink(req.file.path, () => {
            res.json(xres({ code: 0 }, result));
        });
    })


    // 下载模板文件
    .post('/download', (req, res) => {
        let {templates} = req.body;

        let queue = [];

        templates.map((template_id) => {
            queue.push((cb) => {
                templateModel.detail(template_id, {}, (result) => {
                    cb(null, result);
                });
            });
        });

        async.series(queue, (err, result) => {
            let templateData = {};

            result.forEach((item) => {
                templateData[item.name] = item.template.map((schema) => [schema.field]);
            });

            utils.encodeXlsx(templateData);
        });
    })


/**
 * 模板文件
 * {
 *      "product_type": [
 *          {
 *              "field": "颜色",
 *              "type": "string",
 *              "value": ["111", "222", "333", "444"]
 *          }
 *      ]
 * }
 * 
 */
