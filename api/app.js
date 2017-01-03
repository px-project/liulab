/**
 * api入口文件
 */
const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');
const redis = require('redis');
const redisStore = require('connect-redis')(session);
const cors = require('cors');

// body解析
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// connect db
require('./common/db');


// 默认端口：9000
app.set('PORT', process.env.PORT || 9000);


// session
app.use(session({
	secret: 'liulab',
	store: new redisStore({ client: require('./common/redis') }),
	cookie: { maxAge: 1000 * 60 * 60 * 24 * 7 }  // 7days
}));


// 跨域支持
app.use((req, res, next) => {
	cors({ origin: req.headers.origin, credentials: true })(req, res, next);
});


// 认证登录状态
// app.use(require('./common/xauth'));


// 路由
app.use('/', require('./routes/'));


// 静态文件
app.use(express.static(path.join(__dirname, './asset/')));


// 启动服务
app.listen(app.get('PORT'), () => {
	console.log('api server running at ' + app.get('PORT') + ' port.');
});
