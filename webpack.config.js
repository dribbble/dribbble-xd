const path = require('path')
const production = process.env.NODE_ENV === 'production'
const WebpackDefinePlugin = require('webpack').DefinePlugin

require('dotenv').config({
  path: path.resolve(process.cwd(), production ? '.env' : '.env.development')
})

module.exports = {
  entry: './plugin/main.jsx',
  output: {
    path: __dirname,
    filename: 'main.js',
    libraryTarget: 'commonjs2'
  },
  devtool: 'none',
  externals: {
    uxp: 'uxp',
    application: 'application'
  },
  target: 'node',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          plugins: [
            'transform-react-jsx'
          ]
        }
      },
      {
        test: /\.(png|jpg|gif)$/,
        exclude: /node_modules/,
        loader: 'file-loader'
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  },
  plugins: [
    new WebpackDefinePlugin({
      API_CLIENT_KEY: JSON.stringify(process.env.API_CLIENT_KEY),
      SITE_URL: JSON.stringify(process.env.SITE_URL),
      API_URL: JSON.stringify(process.env.API_URL),
      DEV_BASIC_AUTH: JSON.stringify(!production ? process.env.DEV_BASIC_AUTH : null),
    })
  ]
}
