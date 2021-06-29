module.exports = {
  headers: {
    'Access-Control-Allow-Origin': 'http://localhost:8081',
  },
  optimization: {
    splitChunks: {
      chunks: 'async',
      minSize: 30000,
      maxSize: 0,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
      name: true,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },
  externals: {
    canvg: 'canvg',
    html2canvas: 'html2canvas',
    dompurify: 'dompurify',
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
