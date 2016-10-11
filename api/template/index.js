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
const path = require('path');


module.exports = _router


    // 解析模板文件
    .post('/upload', upload.single('file'), (req, res) => {
        getMultiTemplateDetail(req.query.template_id, (templates) => {
            let excelData = utils.decodeXlsx(req.file.path);

            // 
            templates.map((tpl, tplIndex) => {

            });

            
        })


        let result = utils.decodeXlsx(req.file.path);

        for (let sheetName in result) {
            result[sheetName] = result[sheetName].filter((item, index) => index > 1);
        }

        // 删除文件
        fs.unlink(req.file.path, () => {
            res.json(xres({ code: 0 }, { _id: new Date().getTime(), result }));
        });
    })


    // 下载模板文件
    .get('/download', (req, res) => {
        getMultiTemplateDetail(req.query.template_id, (result) => {
            let templateData = {};

            result.forEach((item) => {
                templateData[item.name] = item.template.map((schema) => [schema.field]);
            });

            // 生成xlsx
            utils.encodeXlsx(templateData);

            res.download(path.join(__dirname, '../uploads/output.xlsx'), 'template.xlsx', () => {
                // 删除文件
                fs.unlink(path.join(__dirname, '../uploads/output.xlsx'));
            });
        });
    })


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



function getMultiTemplateDetail(templates, cb) {
    if (typeof templates === 'string') templates = [templates];

    let queue = [];

    templates.map((id) => {
        queue.push((cb) => {
            templateModel.detail(id, {}, (result) => {
                cb(null, result);
            });
        });
    });

    async.series(queue, (err, result) => {
        cb(result);
    });
}



