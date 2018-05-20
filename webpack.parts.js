const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const GitRevisionPlugin = require('git-revision-webpack-plugin')
const BabiliPlugin = require('babili-webpack-plugin')

exports.loadJavascript = ({ include, exclude }) => ({
})

exports.loadSourceMaps = () => ({
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: ['source-map-loader'],
        enforce: 'pre'
      }
    ]
  }
})

exports.generateSourceMaps = ({ type }) => ({
  devtool: type
})

exports.clean = (path) => ({
  plugins: [
  ]
})

exports.attachRevision = () => ({
  plugins: [
    new webpack.BannerPlugin({
      banner: new GitRevisionPlugin().version()
    })
  ]
})

exports.minifyJavascript = () => ({
  plugins: [
    new BabiliPlugin()
  ]
})

exports.setFreeVariable = (key, value) => {
  const env = {}
  env[key] = JSON.stringify(value)

  return {
    plugins: [
      new webpack.DefinePlugin(env)
    ]
  }
}

