const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin')

const target = process.env.npm_lifecycle_event
const isMobile = target.includes('android') || target.includes('ios')

module.exports = {
  productionSourceMap: false,
  publicPath: isMobile ? '' : '/',
  pluginOptions: {
    cordovaPath: 'src-cordova'
  },
  configureWebpack: {
    devServer: {
      port: 8081
    },
    plugins: [
      new VuetifyLoaderPlugin()
    ]
  }
}
