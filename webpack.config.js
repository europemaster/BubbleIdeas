var debug = process.env.NODE_ENV !== "production";
var webpack = require('webpack');
var path = require('path');

module.exports = {
    devtool: debug ? "inline-sourcemap" : null,
    entry: "./src/js/client.js",
    module: {
        rules: [{
            test: /\.(png|jpg|svg|gif)$/,
            use: [
                {
                    loader: 'file-loader',
                    options: {
                        outputPath: 'images/'
                    }
                }
            ]
        },
            {
            test: /\.scss$/,
            use: [

                {
                    loader: "style-loader"
                },
                {
                    loader: "css-loader"
                },
                {
                    loader: "sass-loader"
                }]
        },
        {
            test: /\.jsx?$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'babel-loader',
            query: {
                presets: ['react', 'es2015', 'stage-0'],
                plugins: ['react-html-attrs', 'transform-class-properties', 'transform-decorators-legacy'],
            }
        },
        {
            test: /\.(ttf|svg|eot|woff|woff2)$/,
            use: [
                {
                    loader: 'file-loader',
                    options: {
                        outputPath: 'fonts/'
                    }
                }
            ]
        }
        ],
    },
    output: {
        path: path.resolve("./dist/"),
        filename: "client.min.js"
    },
    plugins: debug ? [] : [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
    ],
    devServer: {

        historyApiFallback: {
            index: 'index.html'

        }
    }
};
