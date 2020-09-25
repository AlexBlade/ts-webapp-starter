const HtmlWebpackPlugin = require('html-webpack-plugin');

const htmlPlugin = new HtmlWebpackPlugin({
    chunks: ['app'],
    inject: true,
    filename: "index.html",
    template: "src/frontend/index.html"
});

module.exports = htmlPlugin;