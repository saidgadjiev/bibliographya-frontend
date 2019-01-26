<template>
  <v-card tile>
    <biography-card-title-moderation v-if="showModerationBlock" class="pb-0" v-bind="$attrs"/>
    <biography-card-publish-title
      v-if="showPublishBlock"
      v-bind="attrs"
      class="pb-0"
      v-on="$listeners"/>
    <biography-card-title v-bind="attrs" v-on="$listeners"/>
    <v-divider></v-divider>
    <biography-card-text v-bind="attrs"/>
    <v-divider></v-divider>
    <biography-card-actions v-bind="attrs" v-on="$listeners"/>
    <biography-card-user-actions v-if="showUserActions" class="pt-0" v-bind="$attrs" v-on="$listeners"/>
    <biography-moderation-card-actions v-if="showModerationActions" v-bind="$attrs" v-on="$listeners"/>
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
import BiographyCardUserActions from './card/BiographyCardUserActions'
import BiographyCardTitleModeration from './card/BiographyCardTitleModeration'
import BiographyModerationCardActions from './card/BiographyModerationCardActions'

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
    showModerationActions: {
      type: Boolean,
      default: false
    },
    showUserActions: {
      type: Boolean,
      default: false
    },
    showComments: {
      type: Boolean,
      default: false
    },
    showModerationBlock: {
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
      return likeService.like(id)
    },
    unlike (id) {
      return likeService.unlike(id)
    }
  },
  components: {
    BiographyModerationCardActions,
    BiographyCardTitleModeration,
    BiographyCardUserActions,
    BiographyCardPublishTitle,
    Comments,
    BiographyCardActions,
    BiographyCardTitle,
    BiographyCardText
  }
}
</script>

<style scoped>
</style>
