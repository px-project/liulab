/**
 * api入口文件
 */
const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const csp = require('helmet-csp');

// body解析
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// connect db
require('./common/db');


// 默认端口：9000
app.set('PORT', process.env.PORT || 9000);

// 跨域支持
app.use((req, res, next) => {
	cors({ origin: req.headers.origin, credentials: true })(req, res, next);
});

// // csp
// app.use(csp({
// }));


// 认证登录状态
app.use(require('./common/xauth'));


// handle query
app.use(require('./common/xquery'));

// 路由
app.use('/', require('./routes/'));


// 静态文件
app.use(express.static(path.join(__dirname, './asset/')));


// 启动服务
app.listen(app.get('PORT'), () => {
	console.log('api server running at ' + app.get('PORT') + ' port.');
});
