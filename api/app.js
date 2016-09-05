/**
 * api入口文件
 */
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// body解析
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// 默认端口：9000
app.set('PORT', process.env.PORT || 9000);


// 跨域支持
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    next();
});


// 路由
app.use('/', require('./routes/'));


// 启动服务
app.listen(app.get('PORT'), () => {
    console.log('api server running at ' + app.get('PORT') + ' port.');
});
