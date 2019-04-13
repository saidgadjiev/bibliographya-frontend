<template>
  <div>
    <v-card-actions>
      <like
        v-bind="_attrs"
        v-on="$listeners"
        :like="like"
        :unlike="unlike"
        class="ml-1"
      />
      <comment-icon v-if="!disableComments" v-bind="_attrs"/>
      <share-icon :page-url="_biographyLink" :page-description="_biographyDescription" :page-title="_biographyTitle" :magick-text="_magickText"/>
    </v-card-actions>
    <v-card-actions v-if="showModerationActions">
    <v-layout row wrap>
      <v-flex xs12 v-for="(action, index) in actions" :key="index">
        <moderation-button
          v-bind="_attrs"
          v-on="$listeners"
          :key="action.name"
          :action="action"
        />
      </v-flex>
    </v-layout>
    </v-card-actions>
  </div>
</template>

<script>
import Like from './action/LikeIcon.vue'
import CommentIcon from './action/CommentIcon.vue'
import likeService from '../../../services/like-service'
import ShareIcon from './action/ShareIcon'
import { getShareDescription } from '../../../messages'
import ModerationButton from '../../moderation/card/ModerationButton'

export default {
  name: 'BiographyCardActions',
  inheritAttrs: false,
  components: {
    ModerationButton,
    ShareIcon,
    Like,
    CommentIcon
  },
  props: {
    id: Number,
    firstName: String,
    lastName: String,
    middleName: String,
    disableComments: Boolean,
    moderatorId: {
      type: Number
    },
    showModerationActions: {
      type: Boolean,
      default: false
    },
    actions: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  computed: {
    _attrs () {
      return Object.assign({},
        this.$attrs,
        {
          id: this.id,
          firstName: this.firstName,
          lastName: this.lastName,
          middleName: this.middleName
        }
      )
    },
    _biographyLink () {
      return 'https://bibliographya.com/biographies/' + this.id
    },
    _biographyDescription () {
      return getShareDescription(this.firstName, this.lastName, this.middleName)
    },
    _biographyTitle () {
      return this.firstName + ' ' + this.lastName
    },
    _magickText () {
      return this.firstName + '\n' + this.lastName
    }
  },
  methods: {
    like (id) {
      return likeService.like(id)
    },
    unlike (id) {
      return likeService.unlike(id)
    }
  }
}
</script>

<style scoped>

</style>
