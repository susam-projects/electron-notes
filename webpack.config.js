const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackBar = require('webpackbar');

function rootPath(dir = '') {
    return path.resolve(__dirname, dir);
}

function srcPath(dir = '') {
    return rootPath('src/' + dir);
}

function distPath(dir = '') {
    return rootPath('dist/' + dir);
}

module.exports = [
    {
        mode: 'development',
        entry: './src/main.ts',
        target: 'electron-main',
        module: {
            rules: [{
                test: /\.ts$/,
                include: rootPath('src'),
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
        entry: './src/index.tsx',
        target: 'electron-renderer',
        devtool: 'source-map',
        output: {
            path: distPath(),
            filename: 'index.js'
        },
        plugins: [
            new WebpackBar(),
            new HtmlWebpackPlugin({
                template: srcPath('index.html')
            })
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
        },
        module: {
            rules: [{
                test: /\.ts(x?)$/,
                include: srcPath(),
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
                enforce: "pre",
                test: /\.jsx?$/,
                use: [{
                    loader: 'source-map-loader'
                }]
            },]
        }
    }
];
