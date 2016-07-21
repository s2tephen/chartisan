var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var NODE_ENV = process.env.NODE_ENV || 'development';

module.exports = {
  entry: './src/app.js',
  output: {
    filename: '[name].js',
    path: './dist'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react']
        }
      },
      {
        test: /\.html$/,
        loader: 'file?name=[name].[ext]'
      },
      {
        test: /\.css$/,
        loader: NODE_ENV === 'production' ? ExtractTextPlugin.extract('style-loader', 'css-loader?{"minimize":true}!postcss-loader')
                                          : 'style-loader!css-loader?{"minimize":true}!postcss-loader'
      },
      {
        test: /\.ico$/,
        loader: 'file?name=[name].[ext]'
      },
      {
        test: /\.png$/,
        loader: 'file?name=img/[name].[ext]'
      },
      {
        test: /\.woff2?$/,
        loader: 'file?name=fonts/[name].[ext]'
      }
    ]
  },
  postcss: function(webpack) {
    return [
      require('postcss-import')({
        addDependencyTo: webpack
      }),
      require('precss'),
      require('autoprefixer')
    ];
  },
  plugins: NODE_ENV === 'production' ? [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(NODE_ENV)
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.ContextReplacementPlugin(/moment[\\\/]locale$/, /^\.\/en$/),
    new ExtractTextPlugin('[name].css')
  ] : []
};