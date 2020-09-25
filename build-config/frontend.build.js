const path = require('path');
const indexHtmlPlugin = require('./frontent-build-plugins/index-html-copy.plugin');

module.exports = (mode) => {
    const buildPlugins = [];
    const buildMode = mode;
    const devTool = mode === 'production' ? '' : 'source-map';

    buildPlugins.push(indexHtmlPlugin);

    return {
        name: 'frontend',
        mode: buildMode,
        devtool: devTool,
        entry: {
            'app': './src/frontend/assets/app/index.tsx'
        },
        resolve: {
            extensions: ['.ts', '.tsx', '.js', '.jsx']
        },
        output: {
            filename: 'assets/js/[name].js',
            path: path.resolve(__dirname, '../dist/public/')
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: 'ts-loader',
                    exclude: [/node_modules/, /dist/, /test/, /build/, /config/]
                },
                {
                    test: /\.(scss|css)$/,
                    use: [
                        {
                            loader: 'style-loader'
                        },
                        {
                            loader: 'css-loader'
                        },
                        {
                            loader: 'resolve-url-loader'
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: true
                            }
                        }
                    ]
                },
                {
                    test: /\.(woff(2)?|eot|ttf|svg)$/,
                    include: /(font|fonts|webfonts)/,
                    loader: 'file-loader',
                    options: {
                        outputPath: 'assets/fonts',
                        name: (file) => {
                            let filepath = path.dirname(file);
                            let pathElements = filepath.split(/[\\/]/);
                            let partialPath = pathElements.length && pathElements.length > 1 ? pathElements[pathElements.length - 1] : '';
                            return partialPath + '/[name].[ext]';
                        }
                    }
                }
            ]
        },
        plugins: buildPlugins,
        watchOptions: {
            ignored: [/dist/, /build/, /test/, /node_modules/]
        },
        devServer: {
            writeToDisk: true,
            contentBase: ['dist/public/'],
            index: '/',
            port: 8080,
            //compress: true,
            hot: true,
            proxy: {
                '/': {
                    target: 'http://localhost:3010/'
                }
            }
        }
    }
};
