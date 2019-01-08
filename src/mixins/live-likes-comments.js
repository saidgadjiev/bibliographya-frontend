import { db } from '../firebase/firebase'

export default {
  data () {
    return {
      firstCommentsCount: true,
      firstLikesCount: false,
      commentsCountRef: undefined,
      likesCountRef: undefined
    }
  },
  props: {
    id: Number
  },
  methods: {
    commentsCountChanged (snapshot) {
      let val = snapshot.val()

      if (val !== null && val !== undefined) {
        if (this.firstCommentsCount) {
          this.firstCommentsCount = false
        } else {
          this.liveCommentCountChanged(val)
        }
      }
    },
    likesCountChanged (snapshot) {
      let val = snapshot.val()

      if (val !== null && val !== undefined) {
        if (this.firstLikesCount) {
          this.firstLikesCount = false
        } else {
          this.liveLikesCountChanged(val)
        }
      }
    },
    subscribe () {
      this.commentsCountRef = db.ref('stats/biography/biography' + this.id + '/commentsCount')

      this.commentsCountRef.on('value', this.commentsCountChanged)

      this.likesCountRef = db.ref('stats/biography/biography' + this.id + '/likesCount')

      this.likesCountRef.on('value', this.likesCountChanged)
    }
  },
  beforeDestroy () {
    if (this.commentsCountRef) {
      this.commentsCountRef.off('value', this.commentsCountChanged, this)
    }
    if (this.likesCountRef) {
      this.likesCountRef.off('value', this.likesCountChanged, this)
    }
  }
}
