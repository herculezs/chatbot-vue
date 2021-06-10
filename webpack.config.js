module.exports = {
  headers: {
    'Access-Control-Allow-Origin': 'http://localhost:8081',
  },
  module: {
    rules: [
      {
        test: /\.s(c|a)ss$/,
        use: [
          'vue-style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            // Requires sass-loader@^7.0.0
            options: {
              // eslint-disable-next-line global-require
              implementation: require('sass'),
              indentedSyntax: true, // optional
            },
            // Requires sass-loader@^8.0.0
            // eslint-disable-next-line no-dupe-keys
            options: {
              // eslint-disable-next-line global-require
              implementation: require('sass'),
              sassOptions: {
                indentedSyntax: true, // optional
              },
            },
          },
        ],
      },
    ],
  },
};
