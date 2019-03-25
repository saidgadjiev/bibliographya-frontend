const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin')

module.exports = {
  productionSourceMap: false,
  publicPath: process.env.CORDOVA_PLATFORM ? '' : '/',
  pluginOptions: {
    cordovaPath: 'src-cordova'
  },
  configureWebpack: {
    plugins: [
      new VuetifyLoaderPlugin()
    ]
  }
}
