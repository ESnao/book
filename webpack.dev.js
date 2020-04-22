const merge = require('webpack-merge');
const common = require('./webpack.common');
module.exports = merge(common, {
    // 动态监测并实时更新页面
    devServer: {
        proxy: {
            '/api': {
                target: 'http://192.168.0.125:8080',
                changeOrigin: true,
                pathRewrite: {
                        '^/api': ''
                    }
            },
        },
    }
})