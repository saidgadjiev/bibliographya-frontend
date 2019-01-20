<template>
  <v-card>
    <biography-card-publish-title
      v-if="showPublishBlock"
      v-bind="attrs"
      class="pb-0"
      v-on="$listeners"/>
    <biography-card-title v-bind="attrs"/>
    <v-divider></v-divider>
    <biography-card-text v-bind="attrs"/>
    <v-divider></v-divider>
    <biography-card-actions v-bind="attrs" v-on="$listeners"/>
    <comments
      v-if="showComments"
      v-bind="attrs"
      v-on="listeners"
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
          likesCount: this.likesCount,
          like: this.like,
          unlike: this.unlike,
          addComment: this.addComment,
          availableMore: this.availableMore
        }
      )
    },
    listeners () {
      let vm = this

      return Object.assign({},
        this.$listeners,
        {
          'update:availableMore': function (event) {
            vm.availableMore = event
          }
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
