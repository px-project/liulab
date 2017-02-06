/**
 * 资源路由
 */
const _router = require('express').Router();
const resourceHandlers = require('./handler');
const uploadPath = require('../../config').UPLOAD_PATH;
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        let fileFormat = (file.originalname).split(".");
        cb(null, Date.now() + "." + fileFormat[fileFormat.length - 1]);
    }
});

const upload = multer({ storage: storage });

module.exports = _router
    // 获取资源
    .get('/:link_type/:link_id', (req, res) => {
        let {link_type, link_id} = req.params;
        resourceHandlers.detail(link_id, link_type)
            .then(result => res.sendFile(uploadPath + result.file_name))
            .catch();
    })

    // 更新资源
    .patch('/:link_id', upload.single('file'), (req, res) => {
        resourceHandlers.update(req.params.link_id, req.file.path)
            .then(result => res.json(result));
    })