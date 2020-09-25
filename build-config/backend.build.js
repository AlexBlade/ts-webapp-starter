const path = require('path');

const build = (mode) => {
    const buildMode = mode;
    const buildTag = buildMode === 'production' ? '' : '.dev';
    const devTool = buildMode === 'production' ? '' : 'source-map';
    const plugins = [];

    return {
        name: 'backend',
        mode: buildMode,
        devtool: devTool,
        target: 'node',
        entry: {
            'backend': './src/backend/Backend.ts'
        },
        resolve: {
            extensions: ['.ts', '.js', '.json']
        },
        output: {
            filename: `[name]${buildTag}.js`,
            path: path.resolve(__dirname, '../dist')
        },
        optimization: {
            usedExports: true
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    loader: 'ts-loader',
                    exclude: [/node_modules/, /dist/, /build-config/]
                }
            ]
        },
        plugins
    };
}

module.exports = build;