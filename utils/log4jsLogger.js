/* eslint-disable no-console */
/**
 * 有关日志的配置
*/
const log4js = require('log4js');
const path = require('path');

log4js.configure({
    appenders: {
        console: {
            type: 'console',
            layout: {
                type: 'colored'
            }
        },
        dateFile: {
            type: 'dateFile',
            filename: path.join(__dirname, '../logs/server.log'),
            pattern: '.yyyy-MM-dd',
            compress: true,
            layout: {
                type: 'colored'
            }
        },
        file: {
            type: 'file',
            filename: path.join(__dirname, '../logs/server.log'),
            backups: 3,
            compress: true,
            maxLogSize: 10 * 1024* 1024,
            layout: {
                type: 'colored'
            }
        },
        errDateFile: {
            type: 'dateFile',
            filename: path.join(__dirname, '../logs/server-error.log'),
            pattern: '.yyyy-MM-dd',
            compress: true,
            layout: {
                type: 'colored'
            }
        },
    },
    categories: {
        // 默认日志，输出debug 及以上级别的日志
        default: {
            appenders: ['console', 'dateFile'],
            level: 'debug'
        },
        // 错误日志，输出error 及以上级别的日志
        error: {
            appenders: ['errDateFile'],
            level: 'error'
        }
    }
});

const defaultLogger = log4js.getLogger(); // 获取默认日志
const errorLogger = log4js.getLogger('error'); //获取错误级别日志

// 日志代理, 同时写如 default 和 error 的文件
const loggerProxy = {};
// 遍历日志级别,输入到日志文件

log4js.levels.levels.forEach((level) => {
    let levelStr = level.levelStr.toLowerCase();
    loggerProxy[levelStr] = (...params) => {
        defaultLogger[levelStr](...params);
        errorLogger[levelStr](...params);
    };
});

/**
 * 覆盖对应的 console 方法
 * @param {string} level
 * @param {loggerProxy} logger
 */
function createLogProxyConsole(level, logger) {
    return (...params) => {
        logger[level](...params);
    };
}
console.log = createLogProxyConsole('debug', loggerProxy);
console.info = createLogProxyConsole('info', loggerProxy);
console.warn = createLogProxyConsole('warn', loggerProxy);
console.error = createLogProxyConsole('error', loggerProxy);

module.exports = loggerProxy;