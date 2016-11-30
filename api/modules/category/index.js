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
const path = require('path');
const upload = multer({ dest: path.join(__dirname, '../../uploads/') });
const fs = require('fs');


module.exports = _router

    // 解析模板文件
    .post('/upload/:categorys', upload.single('file'), (req, res) => {
        getMultiCategoryDetail(req.params.categorys.split(','), categorys => {
            console.log(categorys);

            let excelData = utils.decodeXlsx(req.file.path);

            let result = {};

            categorys.forEach((category, index) => {
                result[category._id] = excelData[index]
                    .filter((item, index) => index > 1)   // 忽略第一行
                    .map((rowData, row) => {
                        let currentRow = {};
                        rowData.forEach((colData, col) => {
                            currentRow[category.attrs[col].key] = colData;
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

            result.forEach((category) => {
                fileName += '_' + category.name;

                categoryData[category.name] = category.attrs.map(attr => [attr.title, (() => {
                    console.log(attr);
                    let result = '';

                    switch (attr.attr_type) {
                        case 'string':
                            result += '类型：文本';
                            break;
                        
                        case 'number':
                            result += '类型：数字';
                            break;
                        
                        case 'select':
                            result += '类型：选项';
                            break;

                        default:
                            console.error('type 有误');
                    }

                    if (attr.attr_required) result += '(必填)';

                    return result;
                })()]);
            });

            // 生成xlsx
            utils.encodeXlsx(categoryData);

            // 处理filename
            fileName = '模板：' + fileName.substr(1) + '.xlsx';
            fileName.replace(/[\s\,\.]/, '');

            res.download(path.join(__dirname, '../../uploads/output.xlsx'), fileName, (err) => {
                // 删除文件
                fs.unlink(path.join(__dirname, '../../uploads/output.xlsx'), () => {});
            });
        });
    })


    // 列表
    .get('/', (req, res) => {
        let condition = {};
        categoryModel.list(condition, (result) => {
            res.json(xres({ code: 0 }, xfilter(result, '_id', 'name', 'photo', 'attrs', 'description', 'create_time', 'update_time')));
        });
    })


    // 详情
    .get('/:category_id', (req, res) => {
        let {category_id} = req.params;
        categoryModel.detail(category_id, {}, (result) => {
            res.json(xres({ code: 0 }, xfilter(result, '_id', 'name', 'photo', 'description', 'attrs', 'create_time', 'update_time')));
        });
    })


    // 添加
    .post('/', (req, res) => {
        let newData = xfilter(req.body, 'name', 'photo', 'description', 'attrs');
        categoryModel.create(newData, (result) => {
            res.json(xres({ code: 0 }, xfilter(result, '_id', 'create_time')));
        });
    })


    // 修改
    .patch('/:category_id', (req, res) => {
        let {category_id} = req.params;

        let newData = xfilter(req.body, 'name', 'photo', 'description', 'attrs');

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

    let queue = categorys.map(category_id => callback => {
        categoryModel.detail(category_id, {}, (result) => callback(null, result));
    });

    async.series(queue, (err, result) => cb(result));
}