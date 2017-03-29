var webpack = require('webpack');
var path = require('path');
module.exports = {
    entry: './src/page/index.jsx',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'index.js'
    },
    module: {
        loaders: [{
            test: /\.js[x]?$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
                presets: ['react', 'es2015']
            }
        }, {
            test: /\.css$/,
            loader: 'style-loader!css-loader'
        }, {
            test: /\.less$/,
            loader: 'style-loader!css-loader!less-loader'
        }]
    },
    plugins: []
};