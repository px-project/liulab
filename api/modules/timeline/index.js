/**
 * 时间轴路由
 */
const _router = require('express').Router();
const timelineHandlers = require('./handler');

module.exports = _router

    // 时间轴列表
    .get('/', (req, res) => {
        timelineHandlers.list(req.l_query)
            .then(result => res.json(result));
    })
