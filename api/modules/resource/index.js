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