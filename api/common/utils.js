/**
 * 工具类
 */
const crypto = require('crypto');
const xlsx = require('xlsx');
const path = require('path');

// md5 加密
exports.md5 = (tarStr) => {
    return crypto.createHash('md5').update(tarStr).digest('hex');
};

// 转hash
exports.hash = (tarStr) => {
    return crypto.createHash('sha1').update(tarStr).digest('hex');
};


// 转驼峰
exports.toCancel = (big, ...strs) => {
    let result = strs.map((str) => str.charAt(0).toUpperCase() + str.substr(1)).join('');
    return big ? result : (result.charAt(0).toLowerCase() + result.substr(1));
};


// 合并
exports.merge = (...targets) => {
    let result = {};
    targets.forEach((obj) => {
        for (let key in obj) {
            if (obj[key] instanceof Object && result[key]) {
                this.merge(result[key], obj[key]);
            } else {
                Object.assign(result, { [key]: obj[key] });
            }
        }
    });
    return result;
};


/**
 * 解析excel
 * 
 * result
 * [
 *      [           // sheet data
 *          [       // row data
 *                  // col data
 *          ]      
 *      ]
 * ]
 */
exports.decodeXlsx = (filePath) => {
    let result = [];

    const workbook = xlsx.readFile(filePath);

    workbook.SheetNames.forEach((sheetName, index) => {
        let sheetResult = result[index] = result[index] || [];
        let sheetData = workbook.Sheets[sheetName];

        Object.keys(sheetData)
            .filter(k => k[0] !== '!')
            .forEach(local => {
                let col = local.charCodeAt(0) - 'A'.charCodeAt(0);
                let row = parseInt(local.substr(1)) - 1;

                sheetResult[row] = sheetResult[row] || [];
                sheetResult[row][col] = sheetData[local].w;
            });
    });
    return result;
};


/**
 * 导出excel
 * 
 * example
 *  data
 *      {
 *          "sheetName": [
 *               [1, 2, 3]                         // X1
 *               []                                // x2
 *           ]
 *      }
 * 
 * 
 * 
 */
exports.encodeXlsx = (data) => {
    let workbook = { SheetNames: [], Sheets: {} };

    for (let sheetName in data) {
        workbook.SheetNames.push(sheetName);

        let sheetData = workbook.Sheets[sheetName] = {};

        let rowMax = 0;
        let colMax = 0;

        data[sheetName].forEach((rowData, row) => {

            rowData.forEach((colData, col) => {
                let site = getSite(row, col);

                sheetData[site] = { v: colData };

                colMax = col;
            });

            rowMax = row;
        });

        sheetData["!ref"] = `A1:${getSite(rowMax, colMax)}`;
    }

    function getSite(row, col) {
        return String.fromCharCode('A'.charCodeAt(0) + row) + (col + 1);
    }

    xlsx.writeFile(workbook, path.join(__dirname, '../uploads/', 'output.xlsx'));
};



exports.deepCopy = (target) => {

    if (Array.isArray(target)) {
        return target.map((item) => {
            if (item instanceof Object) return this.deepCopy(item);
            return item;
        });
    }

    if (target instanceof Object) {
        let result = {};
        for (let key in target) {
            result[key] = target[key] instanceof Object ? this.deepCopy(target[key]) : target[key];
        }
        return result;
    }

    return target;
};
