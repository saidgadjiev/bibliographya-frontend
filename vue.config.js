module.exports = {
  productionSourceMap: false,
  publicPath: process.env.CORDOVA_PLATFORM ? '' : '/',

  pluginOptions: {
    cordovaPath: 'src-cordova'
  }
}
