<template>
  <v-card>
    <biography-card-title v-bind="attrs"/>
    <v-divider></v-divider>
    <biography-card-text v-bind="attrs"/>
    <v-divider></v-divider>
    <biography-card-actions
      v-bind="attrs"
      v-on="$listeners"
      :like="like"
      :unlike="unlike"/>
    <comments
      v-if="showComments"
      v-bind="attrs"
      :add-comment="addComment"
      @comment-added="commentAdded"
      v-on="$listeners"
      :available-more.sync="availableMore"
    />
  </v-card>
</template>

<script>
import BiographyCardActions from './card/BiographyCardActions'
import BiographyCardTitle from './card/BiographyCardTitle'
import BiographyCardText from './card/BiographyCardText'
import Comments from '../comment/Comments'
import likeService from '../../services/like-service'
import bigraphyCommentService from '../../services/biography-comment-service'
import liveCommentsMixin from '../../mixins/live-likes-comments'

export default {
  name: 'biography-card',
  mixins: [liveCommentsMixin],
  inheritAttrs: false,
  data () {
    return {
      addedComment: {},
      availableMore: false
    }
  },
  props: {
    live: {
      type: Boolean,
      default: false
    },
    likesCount: {
      type: Number
    },
    commentsCount: {
      type: Number
    },
    showComments: {
      type: Boolean,
      default: false
    }
  },
  mounted () {
    if (this.live) {
      this.subscribe()
    }
  },
  computed: {
    attrs () {
      return Object.assign({},
        this.$attrs,
        {
          id: this.id,
          commentsCount: this.commentsCount,
          likesCount: this.likesCount
        }
      )
    }
  },
  methods: {
    addComment (biographyId, comment) {
      return bigraphyCommentService.addComment(biographyId, comment)
    },
    commentAdded (comment) {
      this.addedComment = comment
    },
    liveCommentAdded () {
      this.$emit('update:commentsCount', this.commentsCount + 1)
      this.availableMore = true
    },
    likeAdded () {
      this.$emit('update:likesCount', this.likesCount + 1)
    },
    likeDeleted () {
      this.$emit('update:likesCount', this.likesCount - 1)
    },
    like (id) {
      likeService.like(id, 'socketId=' + this.$pusher.connection.socket_id)
    },
    unlike (id) {
      likeService.unlike(id, 'socketId=' + this.$pusher.connection.socket_id)
    }
  },
  components: {
    Comments,
    BiographyCardActions,
    BiographyCardTitle,
    BiographyCardText
  }
}
</script>

<style scoped>
  @import "../../../static/bibliography.css";
</style>
