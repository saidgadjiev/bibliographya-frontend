<template>
  <v-card tile>
    <biography-card-title-moderation v-if="showModerationBlock" class="pb-0" v-bind="$attrs"/>
    <biography-card-publish-title
      v-if="showPublishBlock"
      v-bind="_attrs"
      class="pb-0"
      v-on="$listeners"/>
    <biography-card-secondary-title v-bind="_attrs" v-on="$listeners" class="pb-0"/>
    <biography-card-title v-bind="_attrs" v-on="$listeners" class="pr-5"/>
    <v-divider></v-divider>
    <biography-card-text v-if="_showBiography" v-bind="_attrs"/>
    <v-divider v-if="_showBiography"></v-divider>
    <biography-card-actions v-bind="_attrs" v-on="$listeners"/>
    <biography-card-user-actions v-if="showUserActions" class="pt-0" v-bind="$attrs" v-on="$listeners"/>
    <biography-moderation-card-actions v-if="showModerationActions" v-bind="$attrs" v-on="$listeners"/>
    <comments
      v-if="showComments"
      v-bind="_attrs"
      v-on="listeners"
    />
  </v-card>
</template>

<script>
import BiographyCardActions from './BiographyCardActions'
import BiographyCardTitle from './BiographyCardTitle'
import BiographyCardText from './BiographyCardText'
import Comments from '../../comment/Comments'
import likeService from '../../../services/like-service'
import bigraphyCommentService from '../../../services/biography-comment-service'
import BiographyCardPublishTitle from './BiographyCardPublishTitle'
import BiographyCardUserActions from '../../moderation/card/BiographyCardUserActions'
import BiographyCardTitleModeration from '../../moderation/card/BiographyCardTitleModeration'
import BiographyModerationCardActions from '../../moderation/card/BiographyModerationCardActions'
import BiographyCardSecondaryTitle from './BiographyCardSecondaryTitle'

export default {
  name: 'BiographyCard',
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
    biography: String,
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
    _showBiography () {
      return !!this.biography
    },
    _attrs () {
      return Object.assign({},
        this.$attrs,
        {
          commentsCount: this.commentsCount,
          likesCount: this.likesCount,
          like: this.like,
          unlike: this.unlike,
          addComment: this.addComment,
          availableMore: this.availableMore,
          biography: this.biography
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
    BiographyCardSecondaryTitle,
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
