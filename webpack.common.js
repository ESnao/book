const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
module.exports = {
    // 入口js路径
    entry: {
        index: './src/ts/index.ts'
    },
    plugins: [
        // 自动清空dist目录
        new CleanWebpackPlugin,
        // 设置HTML模板生成路径
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/html/index.html',
            chunks: ['index']
        }),
        new VueLoaderPlugin()
    ],
    // 编译输出的js及路径
    output: {
        // js生成到dist/js，[name]表示保留原js文件名
        filename: 'js/[name].js',
        // 输出路径为dist
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.styl(us)?$/,
                use: ['style-loader', 'css-loader', 'stylus-loader']
            },
            {
                test: /\.vue$/,
                use: ['vue-loader']
            },
            {
                test: /\.(png|jpg|gif|eot|woff|ttf|svg)$/,
                loader: 'url-loader',
                options: {
                    name: '[name]-[hash:6].[ext]',
                    esModule: false,  // 否则src为object module
                    limit: 10000
                }
            },
            {
                test: /\.ts$/,
                use: 'ts-loader'
            }
        ]
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            'common': path.resolve(__dirname, './client/common')
        },
        extensions: ['.ts', '.js', '.vue', '.json']
    }
}