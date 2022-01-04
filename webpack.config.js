const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')

const isDevelopmant = process.env.NODE_ENV != 'production'

module.exports = {
    entry: path.resolve(__dirname,'src', 'index.tsx'),
    mode: isDevelopmant ? 'development' : 'production',
    devtool:  isDevelopmant ? 'eval-source-map' : 'source-map',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx']
    },
    devServer: {
        static: {
          directory: path.join(__dirname, 'public'),
        },
        port: 3000,
        hot: true
    },
    plugins: [
        isDevelopmant && new ReactRefreshWebpackPlugin(),
        new HtmlWebPackPlugin({
            template: path.resolve(__dirname, 'public', 'index.html')
        })
    ].filter(Boolean),
    module: {
        rules: [
            {
                test: /\.(j|t)sx$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        plugins: [
                            isDevelopmant && require.resolve('react-refresh/babel')
                        ].filter(Boolean)
                    }
                }
            },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use:[ 'style-loader', 'css-loader', 'sass-loader' ]
            }
        ]
    }


}