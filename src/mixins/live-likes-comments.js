import { db } from '../firebase/firebase'

export default {
  props: {
    id: Number,
    first: false
  },
  methods: {
    childAdded (snapshot) {
      if (!this.first) {
        this.first = true

        return
      }
      if (parseInt(snapshot.key) === that.addedComment.id) {
        return
      }
      this.liveCommentAdded()
    },
    subscribe () {
      db.ref('biographies/' + this.id + '/comments')
        .limitToLast(1)
        .on('child_added', this.childAdded)
    }
  },
  beforeDestroy () {
    db.off('child_added', this.childAdded, this)
  }
}
