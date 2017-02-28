var webpackMerge = require('webpack-merge');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var commonConfig = require('./webpack.common.js');
var helpers = require('./helpers');
var path = require('path');
var SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');

module.exports = webpackMerge(commonConfig, {
    devtool: 'cheap-module-eval-source-map',

    output: {
        path: helpers.root('dist'),
        publicPath: 'http://localhost:8080/',
        filename: '[name].js',
        chunkFilename: '[id].chunk.js'
    },

    plugins: [

    new ExtractTextPlugin('[name].css'),
     new SWPrecacheWebpackPlugin({
            cacheId: 'Event-management',
            filename: 'service-worker.js',
            staticFileGlobs: [
        'dist/**.html',
        'dist/**.js',
          'dist/**.css'
          ],
            root: 'dist',
            stripPrefix: 'dist/',
            maximumFileSizeToCacheInBytes: 7194304,
            navigateFallback: '/index.html',
            runtimeCaching: [{
                urlPattern: /node-hnapi\.herokuapp\.com/,
                handler: 'networkFirst'
  }]
        })
  ],

    devServer: {
        contentBase: './dist',
        historyApiFallback: true,
        stats: 'minimal'
    }
});