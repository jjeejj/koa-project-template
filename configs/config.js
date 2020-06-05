/**
 * 应用服务的配置信息
*/
const env = process.env.NODE_ENV || 'development';

// 公共的配置
const commonConf = {
    host: '0.0.0.0',
    port: 6080
};

// 不同环境的配置
const envConf = {
    development: {

    },
    test: {

    },
    production: {

    }
};

function getConfig () {
    let config;
    return function getInstance () {
        if (!config) {
            let _envConf = envConf[env];
            config = Object.assign(commonConf, _envConf);
        }
        return config;
    };
}

module.exports = getConfig()();