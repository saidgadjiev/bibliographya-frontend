import utils from '../assets/js/utils'

export default {
  computed: {
    _bibliographyaPath () {
      return 'bibliographya://' + this._path
    },
    _path () {
      let path = this.$route.fullPath

      path = path.substring(1)

      return path
    },
    _intent () {
      if (this._isAndroidBrowser) {
        return 'intent://' + this._path + '#Intent;package=com.bibliographya.android;scheme=bibliographya;launchFlags=268435456;end;'
      }

      return '#'
    },
    _isAndroidBrowser () {
      return utils.isAndroidBrowser()
    },
    _isSupportedBrowser () {
      return utils.isSupportedBrowser()
    }
  },
  methods: {
    openApp () {
      if (this._isAndroidBrowser) {
        let w = window.open(this._bibliographyaPath, '_system')

        setTimeout(function () {
          if (!w.closed) {
            w.open('market://details?id=com.saidgadjiev.bibliographya', '_system')
          }
        }, 100)
      }
    }
  }
}
