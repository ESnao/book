const merge = require('webpack-merge');
const common = require('./webpack.common');
module.exports = merge(common, {
    // 动态监测并实时更新页面
    devServer: {
        proxy: {
            '/api': {
                target: 'http://47.100.139.28:8080',
                changeOrigin: true,
                // pathRewrite: {
                //         '^/api': ''
                //     }
            },
        },
    }
})