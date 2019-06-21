const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin')
const MomentLocalesPlugin = require('moment-locales-webpack-plugin')
//const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const target = process.env.npm_lifecycle_event
const isMobile = target.includes('android') || target.includes('ios')

module.exports = {
  productionSourceMap: false,
  publicPath: isMobile ? '' : '/',
  pluginOptions: {
    cordovaPath: 'src-cordova'
  },
  chainWebpack: config => {
    // удаляем prefetch плагин:
    config.plugins.delete('prefetch')
  },
  configureWebpack: {
    plugins: [
      new VuetifyLoaderPlugin(),
      // new BundleAnalyzerPlugin(),
      new MomentLocalesPlugin({
        localesToKeep: ['ru'],
      })
    ]
  }
}
