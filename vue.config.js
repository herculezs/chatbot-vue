const path = require('path');

function resolve(dir) {
  return path.join(__dirname, dir);
}
module.exports = {
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
            '@import "@/styles/variables.scss";',
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
