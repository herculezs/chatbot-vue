const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

function resolve(dir) {
  return path.join(__dirname, dir);
}
module.exports = {
  configureWebpack: (config) => {
    const customPlugins = [];
    if (process.env.VUE_APP_BUILD !== undefined) {
      customPlugins.push(new webpack.NormalModuleReplacementPlugin(
        /src\/assets\/logo\.png/,
        '../profiles/' + process.env.VUE_APP_BUILD + '/logo.png',
      ));
      customPlugins.push(new CopyWebpackPlugin(
        [
          {
            from: 'src/profiles/'  + process.env.VUE_APP_BUILD +  '/favicon.ico',
            to: ''
          }
        ])
      );
    } else {
      customPlugins.push(new CopyWebpackPlugin(
        [
          {
            from: 'src/assets/favicon.ico',
            to: ''
          }
        ])
      );
    }

    config.plugins = [
      ...customPlugins,
      ...config.plugins,
    ];
  },
  chainWebpack: (config) => {
    config.resolve.alias.set('@', resolve('src'));
    config.resolve.alias.set('@api', resolve('api'));
    config.resolve.alias.set('@views', resolve('src/views'));
    config.resolve.alias.set('@store', resolve('src/store'));
    config.resolve.alias.set('@router', resolve('src/router'));
    config.resolve.alias.set('@components', resolve('src/components'));
    config.resolve.alias.set('@utils', resolve('src/utils'));
    config.resolve.alias.set('@helpers', resolve('src/helpers'));
    config.resolve.alias.set('@config', resolve('src/config'));
    config.resolve.alias.set('@constants', resolve('src/constants'));
    config.resolve.alias.set('@mixins', resolve('src/mixins'));
  },
  css: {
    loaderOptions: {
      scss: {
        prependData:
            `@import "@/styles/variables${process.env.VUE_APP_BUILD ? '-' + process.env.VUE_APP_BUILD : ''}.scss";`,
      },
    },
  },

  // proxy API requests to Valet during development
  // devServer: {
  //   proxy: process.env.VUE_APP_URL,
  // },

  // output built static files to Laravel's public dir.
  // note the "build" script in package.json needs to be modified as well.
  outputDir: process.env.OUTPUT_DIR,

  // modify the location of the generated HTML file.
  // make sure to do this only in production.
  indexPath: 'index.html',
};
