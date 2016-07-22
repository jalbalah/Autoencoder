module.exports = {
    //watch: true,  // toggle for watching (working?)
    entry: {jsx: __dirname+'\\webpack.config.js'},// + '\\assets\\jsx\\'},
    output: {
        path: __dirname + '\\assets\\dist',
        filename: "bundle.min.js" // instead of [hash]
    },
    module: {
        loaders: [
          {
            test: /.jsx?$/,  // only load *.jsx files to babel
            loader: ['babel-loader'],
            exclude: /node_modules/,  // skip unnecessary node files
            query: {
              presets: ['react']
            }
          }
        ],
    }
};