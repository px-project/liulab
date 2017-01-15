/**
 * 资源处理器
 */
const resourceModel = require('../../common/xmodel')('resource');
const uploadPath = require('../../config').UPLOAD_PATH;
const xlsx = require('xlsx');

/**
 * 获取资源详情
 * 
 */
exports.detail = link_id => resourceModel.list({ link_id })
    .then(result => {
        if (result.length) return result[0];
        Promise.reject(40100);
    });


/**
 * 创建资源
 */
exports.create = (_id, type, file_path) => resourceModel.create({ link_id: _id, file_path, link_type: type });


/**
 * 更新资源
 * 
 */
exports.update = (_id, file_path) => resourceModel.update(_id, { file_path });


/**
 * 解析excel
 * 
 * 
 * result
 * [
 *      [           // sheet data
 *          [       // row data
 *                  // col data
 *          ]      
 *      ]
 * ]
 * 
 */
exports.decodeExcel = fileName => {
    let result = [];

    const workbook = xlsx.readFile(uploadPath + '/' + filePath);


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
 * 生成excel
 * 
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
 */
exports.genExcel = data => {
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

    const filePath = uploadPath + new Date().getTime() + '.xlsx';

    xlsx.writeFile(workbook, filePath);

    return filePath;
}