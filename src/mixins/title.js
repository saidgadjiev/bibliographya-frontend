import { TITLE } from '../config'

export default {
  methods: {
    setTitle (title) {
      document.title = title
    }
  },
  beforeDestroy () {
    document.title = TITLE
  }
}
