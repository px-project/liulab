/**
 * 资源处理
 */

const express = require('express');
const _router = express.Router();
const resourceActions = require('./actions');
const xlsx = require('xlsx');
const multer = require('multer');
const upload = multer({ dest: './uploads/' });
const fs = require('fs');
const path = require('path');
const xres = require('../common/xres');


// 获取资源
_router.get('/:resource_id', (req, res) => {
    let { resource_id } = req.params;
    resourceActions.detail(resource_id, {}, (result) => {
        if (result.type === 'json') {
            res.json(xres({ CODE: 0 }, result));
        }
        // if (result.type === '') {

        // }
    });
});

// 上传资源
_router.post('/', upload.single('file'), (req, res) => {
    let { type } = req.body;
    if (type === 'xlsx') {
        let workbook = xlsx.readFile(req.file.path);

        let resData = {
            _id: req.file.filename,
            data: []
        };

        workbook.SheetNames.map((sheet, index, arr) => {
            let sheetData = workbook.Sheets[sheet];

            // let currentSheetData = {
            //     product_type: sheet,
            //     fields: [],
            //     names: [],
            //     values: []
            // };

            /**
             * {
             *      product_type: 'sheet1',
             *      fields: [
             *          {
             *              key: 'code',
             *              title: '货号'
             *          }
             *      ],
             *      data: [
             *          {
             *              code: '111'
             *          }
             *      ]
             * }
             */
            let currentSheetData = {
                product_type: sheet,
                fields: [],
                data: []
            };

            for (let cell in sheetData) {
                // cell = A1 B1 C1 A2 B2 C2 A3..      横向字母  纵向数字

                let currentRow = Number(cell.charAt(1));                    // 1 begin
                let currentCol = cell.charCodeAt(0) - 'A'.charCodeAt(0);    // 0 begin

                // 第一行：key    TODO:本处仅限26个产品属性   A1  B1
                if (currentRow === 1) {
                    currentSheetData.fields.push({key: sheetData[cell].v});
                }

                // 第二行：title                            A2  B2
                if (currentRow === 2) {
                    currentSheetData.fields[currentCol].title = sheetData[cell].v;
                }

                // 剩余行为数据                             A3   B3    A4  B4
                if (currentRow > 2) {
                    currentSheetData.data[currentRow - 3] = currentSheetData.data[currentRow - 3] || [];
                    let currentRowData = currentSheetData.data[currentRow - 3];

                    currentRowData.push({
                        [currentSheetData.fields[currentCol].key]: sheetData[cell].v
                    });
                }
            }


            resData.data.push(currentSheetData);
        });

        // 删除文件
        fs.unlink(path.join(__dirname, '../uploads', req.file.filename), () => {
            res.json(xres({CODE: 0}, resData));
        });
    }
});

module.exports = _router;
