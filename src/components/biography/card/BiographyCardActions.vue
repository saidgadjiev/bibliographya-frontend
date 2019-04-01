<template>
  <v-card-actions>
    <like
      v-bind="_attrs"
      v-on="$listeners"
      :like="like"
      :unlike="unlike"
      class="ml-1"
    />
    <comment-icon v-bind="_attrs"/>
    <share-icon :page-url="_biographyLink" :page-description="_biographyDescription"/>
  </v-card-actions>
</template>

<script>
import Like from './LikeIcon.vue'
import CommentIcon from './CommentIcon.vue'
import likeService from '../../../services/like-service'
import ShareIcon from './ShareIcon'
import { getShareDescription } from '../../../messages'

export default {
  name: 'BiographyCardActions',
  inheritAttrs: false,
  components: {
    ShareIcon,
    Like,
    CommentIcon
  },
  props: {
    id: Number,
    firstName: String,
    lastName: String,
    middleName: String
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
