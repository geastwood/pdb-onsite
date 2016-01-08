module.exports = {
  entry: './src/index.js',
  output: {
    filename: './dist/pdb.js',
    library: 'Pdb'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /(node_modules|bower_components)/,
      loader: 'babel-loader',
      query: {
        presets: ['es2015']
      },
      resolve: {
        extensions: ['.js']
      }
    }]
  }
};
