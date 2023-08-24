const { resolve } = require('./utils');
const isDev = process.env.NODE_ENV === 'development';

module.exports = {
  chainWebpack: config => {
    config.resolve.alias
      .set("@", resolve("src"))
      .set("@comps", resolve("src/components"))
      .set("@assets", resolve("src/assets"))
      .set("@imgs", resolve("src/assets/images"))
      .set("@themes", resolve("src/themes"))
      .set("@views", resolve("src/views"))
      .set("@utils", resolve("src/utils"))
      .set("@mixins", resolve("src/mixins"))
      .set("jerri-ui", resolve("src/components/index.js"));

    const oneOfsMap = config.module.rule('scss').oneOfs.store;
    oneOfsMap.forEach(item => {
      item
        .use('sass-resources-loader')
        .loader('sass-resources-loader')
        .options({
          // 全局使用样式变量和混入
          resources: ['./src/themes/var.scss', './src/themes/mixins.scss']
        })
        .end()
    })

    if (!isDev && process.argv.includes("esm")) {
      config.optimization.delete('splitChunks')
      config.plugins.delete('copy')
      config.plugins.delete('preload')
      config.plugins.delete('prefetch')
      config.plugins.delete('html')
      config.plugins.delete('hmr')
      config.entryPoints.delete('app')

      config.module
        .rule('fonts')
        .use('url-loader')
        .tap(option => {
          option.fallback.options.name = 'static/fonts/[name].[hash:8].[ext]'
          return option
        });
    }
  },
  devServer: {
    port: 6679, // 端口
    open: true
  }
};
