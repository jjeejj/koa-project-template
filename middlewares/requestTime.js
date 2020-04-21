/**
 * 请求日志的中间件
*/
const logger = require('../utils/log4jsLogger.js');

module.exports = async (ctx, next) => {
    const start = Date.now();
    await next();
    const end = Date.now();
    const responseTime = end - start;
    logger.info(`url: ${ctx.url}; 相应时间为：${responseTime}`)
};