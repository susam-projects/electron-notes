const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackBar = require('webpackbar');
const CopyPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

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

function distMainPath(dir = '') {
    return distPath('main/' + dir);
}

function distRendererPath(dir = '') {
    return distPath('renderer/' + dir);
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
            path: distMainPath(),
            filename: 'main.js'
        },
        plugins: [
            new WebpackBar(),
            new CleanWebpackPlugin()
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
            path: distPath('renderer'),
            filename: 'index.js'
        },
        plugins: [
            new CleanWebpackPlugin({
                //verbose: true,
            }),
            new WebpackBar(),
            new HtmlWebpackPlugin({
                template: rendererPath('index.html')
            }),
            new CopyPlugin([
                { from: rootPath('node_modules/sceditor/minified'), to: distRendererPath('sceditor') },
                { from: rootPath('node_modules/sceditor/emoticons'), to: distRendererPath('emoticons') }
            ])
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
                test: /(\.?)global\.(s?)css/,
                use: [{
                    loader: 'style-loader'
                }, {
                    loader: 'css-loader',
                    options: {
                        importLoaders: 1,
                        sourceMap: true,
                        modules: false
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
                test: /\.(s?)css$/,
                exclude: /(\.?)global\.(s?)css/,
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
                        sourceMap: true
                    }
                }]
            }, {
                enforce: 'pre',
                test: /\.jsx?$/,
                use: [{
                    loader: 'source-map-loader'
                }]
            }, {
                test: /\.(ttf|woff|woff2|svg|eot)$/,
                use: [{
                    loader: 'file-loader'
                }]
            }]
        }
    }
];
