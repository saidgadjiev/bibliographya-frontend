const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin')

module.exports = {
  productionSourceMap: false,
  publicPath: '',
  pluginOptions: {
    cordovaPath: 'src-cordova'
  },
  configureWebpack: {
    plugins: [
      new VuetifyLoaderPlugin()
    ]
  }
}
