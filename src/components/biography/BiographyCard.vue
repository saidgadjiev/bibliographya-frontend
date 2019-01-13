<template>
  <v-card>
    <biography-card-publish-title
      v-if="showPublishBlock"
      v-bind="attrs"
      class="pb-0"
      v-on="$listeners"/>
    <biography-card-title v-bind="attrs" class="pt-0"/>
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
import BiographyCardPublishTitle from './card/BiographyCardPublishTitle'

export default {
  name: 'biography-card',
  inheritAttrs: false,
  data () {
    return {
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
    },
    showPublishBlock: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    attrs () {
      return Object.assign({},
        this.$attrs,
        {
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
    like (id) {
      likeService.like(id)
    },
    unlike (id) {
      likeService.unlike(id)
    }
  },
  components: {
    BiographyCardPublishTitle,
    Comments,
    BiographyCardActions,
    BiographyCardTitle,
    BiographyCardText
  }
}
</script>

<style scoped>
  @import "../../../static/css/bibliography.css";
</style>
