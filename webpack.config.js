const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackBar = require('webpackbar');

function rootPath(dir = '') {
    return path.resolve(__dirname, dir);
}

function srcPath(dir = '') {
    return rootPath('src/' + dir);
}

function mainPath(dir = '') {
    return srcPath('main/' + dir);
}

function rendererPath(dir = '') {
    return srcPath('renderer/' + dir);
}

function distPath(dir = '') {
    return rootPath('dist/' + dir);
}

module.exports = [
    {
        mode: 'development',
        entry: mainPath('main.ts'),
        target: 'electron-main',
        module: {
            rules: [{
                test: /\.ts$/,
                include: mainPath(),
                use: [{ loader: 'ts-loader' }]
            }]
        },
        output: {
            path: distPath(),
            filename: 'main.js'
        },
        plugins: [
            new WebpackBar()
        ],
        resolve: {
            extensions: ['.js', '.ts', '.tsx'],
            modules: [srcPath(), 'node_modules'],
            symlinks: false
        },
        stats: {
            colors: true,
            modules: false,
            assets: false,
            children: false,
            entrypoints: false,
            warningsFilter: [
                'code-splitting',
                'entrypoint size limit',
                'asset size limit',
                /export 'I.+ was not found in/
            ],
        }
    },
    {
        mode: 'development',
        entry: rendererPath('index.tsx'),
        target: 'electron-renderer',
        devtool: 'source-map',
        output: {
            path: distPath(),
            filename: 'index.js'
        },
        plugins: [
            new WebpackBar(),
            new HtmlWebpackPlugin({
                template: rendererPath('index.html')
            })
        ],
        resolve: {
            extensions: ['.js', '.ts', '.tsx'],
            modules: [rendererPath(), 'node_modules'],
            symlinks: false
        },
        stats: {
            colors: true,
            modules: false,
            assets: false,
            children: false,
            entrypoints: false,
            warningsFilter: [
                'code-splitting',
                'entrypoint size limit',
                'asset size limit',
                /export 'I.+ was not found in/
            ],
        },
        module: {
            rules: [{
                test: /\.ts(x?)$/,
                include: rendererPath(),
                use: [{ loader: 'ts-loader' }]
            }, {
                test: /\.(s?)css$/,
                use: [{
                    loader: 'style-loader'
                }, {
                    loader: 'css-loader',
                    options: {
                        localsConvention: 'camelCase',
                        sourceMap: true,
                        importLoaders: 2,
                        modules: {
                            localIdentName: '[local]--[hash:base64:8]',
                        }
                    }
                }, {
                    loader: 'postcss-loader',
                    options: {
                        sourceMap: true,
                        config: {
                            path: rootPath('postcss.config.js'),
                        }
                    }
                }, {
                    loader: 'sass-loader',
                    options: {
                        sourceMap: true,
                        sassOptions: {
                            includePaths: [
                                rootPath('node_modules')
                            ]
                        }
                    }
                }]
            }, {
                enforce: 'pre',
                test: /\.jsx?$/,
                use: [{
                    loader: 'source-map-loader'
                }]
            },]
        }
    }
];
