const { resolve, getComponentEntries } = require('./utils');
const baseConfig = require('./config.base');

let buildConfig = {
  ...baseConfig,
  publicPath: "./",
  productionSourceMap: true
}

const esmConfig = {
  //  输出文件目录
  outputDir: resolve('lib'),
  //  webpack配置
  configureWebpack: {
    //  入口文件
    entry: getComponentEntries('src/components'),
    //  输出配置
    output: {
      //  文件名称
      filename: '[name]/index.js',
      //  构建依赖类型
      libraryTarget: 'umd',
      //  依赖输出
      libraryExport: 'default',
      //  依赖名称
      library: 'jerri-ui',
    }
  },
  //  样式输出
  css: {
    sourceMap: true,
    extract: {
      filename: '[name]/style.css'
    }
  }
}

if (process.argv.includes("esm")) {
  buildConfig = {
    ...esmConfig,
    ...buildConfig
  }
}

module.exports = buildConfig;
