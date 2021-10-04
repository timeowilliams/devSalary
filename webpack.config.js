const path = require('path');
module.exports = {
  entry: './client/main.js',
  output: { path:'./', filename: 'bundle.js' },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
      },
      {
        test: /\.s*css$/,
        loaders: ["style", "css", "sass"]
      },{
        test: /\.(jpe?g|png|gif|svg)$/i, loader: "file-loader?name=/public/assets/[name].[ext]"},
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  plugins: []
};
