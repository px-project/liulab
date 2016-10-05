/**
 * 资源处理
 */

const express = require('express');
const _router = express.Router();
const templateModel = require('../common/xmodel')('template');
const xlsx = require('xlsx');
const multer = require('multer');
const upload = multer({ dest: './uploads/' });
const fs = require('fs');
const path = require('path');
const xres = require('../common/xres');


module.exports = _router

    // 上传资源
    .post('/', upload.single('file'), (req, res) => {
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
                 *              code: '111',
                 *              num: 11
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
                    let currentCol = cell.charcodeAt(0) - 'A'.charcodeAt(0);    // 0 begin

                    // 第一行：key    TODO:本处仅限26个产品属性   A1  B1
                    if (currentRow === 1) {
                        currentSheetData.fields.push({ key: sheetData[cell].v });
                    }

                    // 第二行：title                            A2  B2
                    if (currentRow === 2) {
                        currentSheetData.fields[currentCol] = currentSheetData.fields[currentCol] || {};
                        currentSheetData.fields[currentCol].title = sheetData[cell].v;
                    }

                    // 剩余行为数据                             A3   B3    A4  B4
                    if (currentRow > 2) {
                        currentSheetData.data[currentRow - 3] = currentSheetData.data[currentRow - 3] || {};
                        let currentRowData = currentSheetData.data[currentRow - 3];

                        currentRowData[currentSheetData.fields[currentCol].key] = sheetData[cell].v;
                    }
                }


                resData.data.push(currentSheetData);
            });

            // 删除文件
            fs.unlink(path.join(__dirname, '../uploads', req.file.filename), () => {
                res.json(xres({ code: 0 }, resData));
            });
        }
    });

