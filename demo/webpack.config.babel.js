const path = require('path')
const webpack = require('webpack')
const glob = require('glob')
const merge = require('webpack-merge')

const parts = require('./webpack.parts.babel')

const root = process.cwd()
const PATHS = {
  app: path.join(root, 'src'),
  build: path.join(root, 'build')
}

const commonConfig = merge([
  {
    entry: {
      app: PATHS.app,
    },
    output: {
      filename: '[name].js',
      path: PATHS.build,
    },
    resolve: {
      mainFields: ['main'],
      extensions: ['.js', '.jsx', '.json', '*'],
      modules: ['node_modules'],
      alias: {
        'react': path.resolve('node_modules', 'react'),
        'redux-form': path.resolve('node_modules', 'redux-form'),
        'brace': path.resolve('node_modules', 'brace')
      }
    },
  },
  parts.loadFonts({
    options: {
      name: '[name].[hash:8].[ext]'
    }
  }),
  parts.loadJavascript({ exclude: /node_modules/ })
])

const productionConfig = merge([
  {
    mode: 'production',
    performance: {
      hints: 'warning',
      maxEntrypointSize: 1200000,
      maxAssetSize: 1200000
    },
    entry: {
      vendor: ['brace', 'react']
    },

    context: PATHS.app,
    output: {
      chunkFilename: '[name]_[hash:8].bundle.js',
      filename: '[name]_[hash:8].bundle.js',
      path: path.join(root, 'build')
    },
    plugins: [
      new webpack.HashedModuleIdsPlugin(),
    ],
  },
  parts.htmlPlugin({ filename: 'demo.html' }),
  parts.clean(PATHS.build),
  parts.minifyJavascript(),
  parts.minifyCSS({
    options: {
      discardComments: {
        removeAll: true
      },
      safe: true
    }
  }),
  parts.extractCSS(),
  parts.purifyCSS({
    paths: glob.sync(`${PATHS.app}/**/*.js`, { nodir: true })
  }),
  parts.loadImages({
    options: {
      limit: 15000,
      name: '[name].[hash:8].[ext]'
    }
  }),
  parts.optimization(),
  parts.attachRevision(),
  parts.setFreeVariable(
    'process.env.NODE_ENV',
    'production'
  )
])

const developmentConfig = merge([
  {
    mode: 'development',
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin(),
    ],
    output: {
      devtoolModuleFilenameTemplate: 'webpack'
    },
  },
  parts.htmlPlugin({ filename: 'index.html' }),
  parts.loadSourceMaps(),
  parts.generateSourceMaps({ type: 'inline-source-map' }),
  parts.devServer({
    host: process.env.HOST,
    port: process.env.PORT,
    index: 'demo.html'
  }),
  parts.loadCSS(),
  parts.loadImages()
])

module.exports = (env = {}) => {
  process.env.BABEL_ENV = env

  if (env == 'production')
    return merge(commonConfig, productionConfig)
  else
    return merge(commonConfig, developmentConfig)
}
