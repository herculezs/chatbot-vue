const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

function resolve(dir) {
  return path.join(__dirname, dir);
}
module.exports = {
  configureWebpack: (config) => {
    const customPlugins = [];
    customPlugins.push(new webpack.DefinePlugin({
      // allow access to process.env from within the vue app
      'process.env': {
        QUESTIONNAIRE_ID: JSON.stringify(process.env.QUESTIONNAIRE_ID),
        FEEDBACK_ID: JSON.stringify(process.env.FEEDBACK_ID),
      },
    }));

    if (process.env.VUE_APP_BUILD !== undefined) {
      customPlugins.push(new webpack.NormalModuleReplacementPlugin(
        /src\/assets\/logo\.png/,
        `../profiles/${process.env.VUE_APP_BUILD}/logo.png`,
      ),
      new webpack.NormalModuleReplacementPlugin(
        /src\/assets\/checkbox_fill\.svg/,
        `../profiles/${process.env.VUE_APP_BUILD}/checkbox_fill.svg`,
      ),
      new webpack.NormalModuleReplacementPlugin(
        /src\/assets\/step_1\.gif/,
        `../profiles/${process.env.VUE_APP_BUILD}/step_1.gif`,
      ),
      new webpack.NormalModuleReplacementPlugin(
        /src\/configEnv\/index\.js/,
        `../profiles/${process.env.VUE_APP_BUILD}/index.js`,
      ));
      customPlugins.push(new CopyWebpackPlugin(
        [
          {
            from: `src/profiles/${process.env.VUE_APP_BUILD}/favicon.ico`,
            to: '',
          },
        ],
      ));
    } else {
      customPlugins.push(new CopyWebpackPlugin(
        [
          {
            from: 'src/assets/favicon.ico',
            to: '',
          },
        ],
      ));
    }

    // eslint-disable-next-line no-param-reassign
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
    config.resolve.alias.set('@configEnv', resolve('src/configEnv'));
    config.resolve.alias.set('@mixins', resolve('src/mixins'));
    let title = 'InnerWorks';
    if (process.env.VUE_APP_BUILD !== undefined) {
      title = 'WellMent';
    }
    config
      .plugin('html')
      .tap((args) => {
        // eslint-disable-next-line no-param-reassign
        args[0].title = title;
        // eslint-disable-next-line no-param-reassign
        args[0].template = './src/index.html.template';
        return args;
      });
  },
  css: {
    loaderOptions: {
      scss: {
        prependData:
            `@import "@/styles/variables${process.env.VUE_APP_BUILD ? `-${process.env.VUE_APP_BUILD}` : ''}.scss";`,
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
