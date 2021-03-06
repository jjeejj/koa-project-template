// 日志对象
const logger = require('./utils/log4jsLogger');
const config = require('./configs/config.js');
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const koaStatic = require('koa-static');
const requestTime = require('./middlewares/requestTime.js');
global.logger = logger;

const app = new Koa();

app.use(requestTime);

// 处理静态资源, 根目录为 statics
app.use(koaStatic(__dirname));

// 处理请求的 body 参数
app.use(bodyParser);

// 引入路由分发
const router = require('./routes');
app.use(router.routes()).use(router.allowedMethods());

app.listen(config.port, config.host, () => {
    logger.info(`server is runnning ${config.host}:${config.port}`);
});