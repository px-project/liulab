/**
 * 品类路由
 */
const _router = require('express').Router();
const categoryHandlers = require('../../common/xmodel')('category');
const resourceHandlers = require('../resource/handler');
const multer = require('multer');
const { UPLOAD_PATH } = require('../../config/');
const upload = multer({ dest: UPLOAD_PATH });
const fs = require('fs');

module.exports = _router

    // 下载模板文件
    .get('/template/:categorys', (req, res) => {
        console.log(req.params.categorys);

        Promise.all(req.params.categorys.split(',').map(category_id => categoryHandlers.detail(category_id)))
            .then(categorys => {

                let categoryData = {};
                let fileName = '';

                categorys.forEach((category) => {
                    fileName += '_' + category.name;

                    categoryData[category.name] = category.attrs.map(attr => [attr.title, (() => {
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
                let filePath = resourceHandlers.genExcel(categoryData);

                // 处理filename
                fileName = '模板：' + fileName.substr(1) + '.xlsx';
                fileName.replace(/[\s\,\.]/, '');

                res.download(filePath, fileName, err => fs.unlink(filePath));

            })
    })

    // 解析模板文件
    .post('/template/:categorys', upload.single('file'), (req, res) => {
        Promise.all(req.params.categorys.split(',').map(category_id => categoryHandlers.detail(category_id)))
            .then(categorys => {

                let excelData = resourceHandlers.decodeExcel(req.file.path);

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
                fs.unlink(req.file.path, () => res.json({ _id: new Date().getTime(), data: result }));
            });
    })

    // 列表
    .get('/', (req, res) => {
        categoryHandlers.list(req.l_query)
            .then(result => res.json(result));
    })


    // 详情
    .get('/:category_id', (req, res) => {
        categoryHandlers.detail(req.params.category_id, req.l_query)
            .then(result => res.json(result));
    })


    // 添加
    .post('/', (req, res) => {
        categoryHandlers.create(req.body)
            .then(result => res.json(result))
            .catch(err => console.error(err));
    })


    // 修改
    .patch('/:category_id', (req, res) => {
        categoryHandlers.update(req.params.category_id, req.body)
            .then(result => res.json(result));
    })


    // 删除
    .delete('/:category_id', (req, res) => {
        categoryHandlers.delete(req.params.category_id)
            .then(result => res.json(result));
    })


    // 当前品类最新编号
    .get('/:category_id/code', (req, res) => {
        categoryHandlers.code(req.params.category_id)
            .then(result => res.json({ code: result }));
    })
