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
            filename: req.file.filename,
            data: []
        };

        workbook.SheetNames.map((sheet, index, arr) => {
            let sheetData = workbook.Sheets[sheet];

            let currentSheetData = {
                product_type: sheet,
                fields: [],
                names: [],
                values: []
            };

            for (let cell in sheetData) {
                if (cell.charAt(1) === '1') {
                    currentSheetData.fields.push(sheetData[cell].v);
                } else if (cell.charAt(1) === '2') {
                    currentSheetData.names.push(sheetData[cell].v);
                } else {
                    let current = currentSheetData.values[Number(cell.substr(1)) - 3] = [];
                    current.push(sheetData[cell].v);
                }

            }
            resData.data.push(currentSheetData);
        });

        res.json(xres({ CODE: 0 }, resData));
    }
});

module.exports = _router;
