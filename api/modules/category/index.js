/**
 * 品类
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
    .post('/upload/:categorys', upload.single('file'), (req, res) => {
        getMultiCategoryDetail(req.params.categorys.split(','), categorys => {

            let excelData = utils.decodeXlsx(req.file.path);

            let result = {};

            categorys.forEach((category, index) => {
                result[category._id] = excelData[index].filter((item, index) => index > 1).map((rowData, row) => {
                    let currentRow = {};
                    rowData.map((colData, col) => {
                        currentRow[category.category[col].key] = colData;
                    });
                    return currentRow;
                });
            });

            // 删除文件
            fs.unlink(req.file.path, () => res.json(xres({ code: 0 }, { _id: new Date().getTime(), result })));
        });

    })


    // 下载模板文件
    .get('/download', (req, res) => {
        getMultiCategoryDetail(req.query.category_id, (result) => {
            let categoryData = {};
            let fileName = '';

            result.forEach((item) => {
                fileName += '_' + item.name;

                categoryData[item.name] = item.category.map((schema) => [schema.title, [schema.type].map((type) => {
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
            utils.encodeXlsx(categoryData);

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
            res.json(xres({ code: 0 }, xfilter(result, '_id', 'name', 'photo', 'describe', 'create_time', 'update_time')));
        });
    })


    // 详情
    .get('/:category_id', (req, res) => {
        let {category_id} = req.params;
        categoryModel.detail(category_id, {}, (result) => {
            res.json(xres({ code: 0 }, xfilter(result, '_id', 'name', 'photo', 'describe', 'attrs', 'create_time', 'update_time')));
        });
    })


    // 添加
    .post('/', (req, res) => {
        let newData = xfilter(req.body, 'name', 'photo', 'describe', 'attrs');
        categoryModel.create(newData, (result) => {
            res.json(xres({ code: 0 }, xfilter(result, '_id', 'create_time')));
        });
    })


    // 修改
    .patch('/:category_id', (req, res) => {
        let {category_id} = req.params;

        let newData = xfilter(req.body, 'name', 'photo', 'describe', 'attrs');

        categoryModel.update(category_id, newData, (result) => {
            res.json(xres({ code: 0 }, xfilter(result, '_id', 'update_time')));
        });
    })


    // 删除
    .delete('/:category_id', (req, res) => {
        let {category_id} = req.params;

        categoryModel.delete(category_id, (result) => {
            res.json(xres({ code: 0 }));
        });
    })

// 获取多个品类详情
function getMultiCategoryDetail(categorys, cb) {
    if (typeof categorys === 'string') categorys = [categorys];
    let queue = categorys.map(category_id => cb => {
        return categoryModel.detail(category_id, {}, result => cb(null, result));
    });
    async.series(queue, (err, result) => cb(result));
}