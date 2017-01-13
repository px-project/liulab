/**
 * 资源路由
 */
const express = require('express');
const _router = express.Router();
const xres = require('../../common/xres');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../../../uploads/'));
    },
    filename: function (req, file, cb) {
        let fileFormat = (file.originalname).split(".");
        cb(null, Date.now() + "." + fileFormat[fileFormat.length - 1]);
    }
});

const upload = multer({ storage: storage });

module.exports = _router
    // 获取资源
    .get('/:filename', (req, res) => {
        res.sendFile(path.join(__dirname, '../../../uploads/', req.params.filename));
    })

    // 创建资源
    .post('/', upload.single('file'), (req, res) => {
        res.json(xres({ code: 0 }, { filename: req.file.filename }));
    })




    // 解析模板文件
    .post('/upload/:categorys', upload.single('file'), (req, res) => {
        getMultiCategoryDetail(req.params.categorys.split(','), categorys => {

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

// // 
//     // 下载模板文件
//     .get('/download', (req, res) => {
//         getMultiCategoryDetail(req.query.category_id, (result) => {

//             let categoryData = {};
//             let fileName = '';

//             result.forEach((category) => {
//                 fileName += '_' + category.name;

//                 categoryData[category.name] = category.attrs.map(attr => [attr.title, (() => {
//                     let result = '';

//                     switch (attr.attr_type) {
//                         case 'string':
//                             result += '类型：文本';
//                             break;

//                         case 'number':
//                             result += '类型：数字';
//                             break;

//                         case 'select':
//                             result += '类型：选项';
//                             break;

//                         default:
//                             console.error('type 有误');
//                     }

//                     if (attr.attr_required) result += '(必填)';

//                     return result;
//                 })()]);
//             });

//             // 生成xlsx
//             utils.encodeXlsx(categoryData);

//             // 处理filename
//             fileName = '模板：' + fileName.substr(1) + '.xlsx';
//             fileName.replace(/[\s\,\.]/, '');

//             res.download(path.join(__dirname, '../../../uploads/output.xlsx'), fileName, (err) => {
//                 // 删除文件
//                 fs.unlink(path.join(__dirname, '../../../uploads/output.xlsx'), () => { });
//             });
//         });
//     })


// 获取多个品类详情
// function getMultiCategoryDetail(categorys, cb) {
//     if (typeof categorys === 'string') categorys = [categorys];

//     let queue = categorys.map(category_id => callback => {
//         categoryModel.detail(category_id, {}, (result) => callback(null, result));
//     });

//     async.series(queue, (err, result) => cb(result));
// }


// const categoryModel = require('../../common/xmodel')('category');
// const xres = require('../../common/xres');
// const xfilter = require('../../common/xfilter');
// const async = require('async');
// const utils = require('../../common/utils');
// const multer = require('multer');
// const path = require('path');
// const upload = multer({ dest: path.join(__dirname, '../../../uploads') });
// const fs = require('fs');
