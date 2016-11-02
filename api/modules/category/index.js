/**
 * 产品类型字段模板
 */
const _router = require('express').Router();
const categoryModel = require('../../common/xmodel')('category');
const xres = require('../../common/xres');
const xfilter = require('../../common/xfilter');
const async = require('async');
const utils = require('../../common/utils');
const multer = require('multer');
const upload = multer({ dest: './uploads/' });
const fs = require('fs');
const path = require('path');


module.exports = _router


    // 解析模板文件
    .post('/upload/:templates', upload.single('file'), (req, res) => {
        getMultiTemplateDetail(req.params.templates.split(','), (templates) => {

            let excelData = utils.decodeXlsx(req.file.path);

            let result = {};

            templates.forEach((template, index) => {
                result[template._id] = excelData[index].filter((item, index) => index > 1).map((rowData, row) => {
                    let currentRow = {};
                    rowData.map((colData, col) => {
                        currentRow[template.template[col].key] = colData;
                    });
                    return currentRow;
                });
            });


            // 删除文件
            fs.unlink(req.file.path, () => {
                res.json(xres({ code: 0 }, { _id: new Date().getTime(), result }));
            });
        });

    })


    // 下载模板文件
    .get('/download', (req, res) => {
        getMultiTemplateDetail(req.query.template_id, (result) => {
            let templateData = {};
            let fileName = '';

            result.forEach((item) => {
                fileName += '_' + item.name;

                templateData[item.name] = item.template.map((schema) => [schema.title, [schema.type].map((type) => {
                    let result = "";

                    switch (type) {
                        case 'string':
                            result += '请在下方输入文字';
                            break;

                        case 'number':
                            result += '请在下方输入数字';
                            break;

                        case 'select':
                            result += '请在下方输入一下选项';
                            break;

                        default:
                            console.error('type 有误');
                    }

                    return result;
                })]);
            });

            // 生成xlsx
            utils.encodeXlsx(templateData);

            // 处理filename
            fileName = fileName.substr(1) + '.xlsx';
            fileName.replace(/[\s\,\.]/, '');

            res.download(path.join(__dirname, '../uploads/output.xlsx'), fileName, () => {
                // 删除文件
                fs.unlink(path.join(__dirname, '../uploads/output.xlsx'));
            });
        });
    })


    // 列表
    .get('/', (req, res) => {
        let condition = {};
        categoryModel.list(condition, (result) => {
            res.json(xres({ code: 0 }, xfilter(result, '_id', 'name', 'user_id', 'template', 'create_time', 'update_time')));
        });
    })


    // 详情
    .get('/:template_id', (req, res) => {
        let {template_id} = req.params;
        categoryModel.detail(template_id, {}, (result) => {
            res.json(xres({ code: 0 }, xfilter(result, '_id', 'name', 'user_id', 'template', 'create_time', 'update_time')));
        });
    })


    // 添加
    .post('/', (req, res) => {
        let newData = xfilter(req.body, 'name', 'template');
        categoryModel.create(newData, (result) => {
            res.json(xres({ code: 0 }, xfilter(result, '_id', 'create_time')));
        });
    })


    // 修改
    .patch('/:template_id', (req, res) => {
        let {template_id} = req.params;

        let newData = xfilter(req.body, 'name', 'template');
        newData.update_time = Date.now();

        categoryModel.update(template_id, newData, (result) => {
            res.json(xres({ code: 0 }, { _id, update_time: newData.update_time }));
        })
    })


    // 删除
    .delete('/:template_id', (req, res) => {
        let {template_id} = req.params;

        categoryModel.delete(template_id, (result) => {
            res.json(xres({ code: 0 }));
        });
    })

/**
 * 模板文件
 * {
 *      "product_type": [
 *          {
 *              "title": "颜色",
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
            categoryModel.detail(id, {}, (result) => {
                cb(null, result);
            });
        });
    });

    async.series(queue, (err, result) => {
        cb(result);
    });
}



