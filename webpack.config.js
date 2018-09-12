require('dotenv').config()
const WebpackDefinePlugin = require('webpack').DefinePlugin

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
      API_CLIENT_KEY: JSON.stringify(process.env.API_CLIENT_KEY || '62deac8a106c866b6047c864a24cdab7f0d03b6330e0099bfeda45eac6a1b8b5'),
      SITE_URL: JSON.stringify(process.env.SITE_URL || 'https://dribbble.com'),
      API_URL: JSON.stringify(process.env.API_URL || null),
      STAGING_AUTH: JSON.stringify(process.env.STAGING_AUTH || null)
    })
  ]
}
