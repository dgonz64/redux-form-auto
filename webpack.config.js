const path = require('path')
const webpack = require('webpack')
const glob = require('glob')
const merge = require('webpack-merge')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const libraryName = 'redux-form-auto'
const libraryObjectName = 'ReduxFormAuto'

const root = process.cwd()
const PATHS = {
  lib: path.join(root, 'src'),
  entry: path.join(root, 'src', 'index.js'),
  build: path.join(root, 'dist')
}

const reactExternal = {
  root: 'React',
  commonjs2: 'react',
  commonjs: 'react',
  amd: 'React'
}

const reactDOMExternal = {
  root: 'ReactDOM',
  commonjs2: 'react-dom',
  commonjs: 'react-dom',
  amd: 'ReactDOM'
}

const reduxExternal = {
  root: 'Redux',
  commonjs2: 'redux',
  commonjs: 'redux',
  amd: 'redux'
}

const reactReduxExternal = {
  root: 'ReactRedux',
  commonjs2: 'react-redux',
  commonjs: 'react-redux',
  amd: 'react-redux'
}

const reduxFormExternal = {
  root: 'ReduxForm',
  commonjs2: 'redux-form',
  commonjs: 'redux-form',
  amd: 'ReduxForm'
}

const commonConfig = merge([
  {
    entry: PATHS.entry,
    output: {
      path: PATHS.build,
      filename: libraryName + '.js',
      library: libraryObjectName,
      libraryTarget: 'umd',
      // umdNamedDefine: true
    },
    target: 'node',
    resolve: {
      extensions: ['.js', '.jsx', '.json', '*'],
      // modules: ['src', 'node_modules'],
      // alias: {
      // 	react: path.resolve(__dirname, 'node_modules', 'react'),
      // 	'react-dom': path.resolve(__dirname, 'node_modules', 'react-dom')
      // },
    },
    externals: [
      'react',
      'react-dom',
      'redux-form',
    ],
    // externals: {
    // 	react: reactExternal,
    // 	'react-dom': reactDOMExternal,
    // 	redux: reduxExternal,
    // 	'react-redux': reactReduxExternal,
    // 	'redux-form': reduxFormExternal
    // },
    plugins: [
      // new BundleAnalyzerPlugin(),
      new CleanWebpackPlugin([PATHS.build])
    ],
  },
  {
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          include: PATHS.lib,
          exclude: /(node_modules|dist)/,
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', {
                modules: false,
                targets: {
                  node: 'current'
                }
              }],
            ]
          },
        },
      ],
    },
  }
])

const productionConfig = merge([
  parts.attachRevision(),
  {
    mode: 'production'
  },
  {
    plugins: [
      new UglifyJSPlugin({
        sourceMap: true
      }),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': 'production'
      })
    ]
  }
])

const developmentConfig = merge([
  {
    mode: 'development'
  },
  parts.generateSourceMaps({ type: 'source-map' }),
])

module.exports = function(env) {
  if (typeof env == 'undefined')
    env = 'production'

  process.env.BABEL_ENV = env

  const specificConfig = env == 'production' ?
    productionConfig : developmentConfig

  const config = merge(commonConfig, specificConfig)

  return config
}
