<template>
  <v-card tile>
    <biography-card-title v-bind="_attrs" v-on="$listeners" class="pr-5"/>
    <v-divider></v-divider>
    <biography-card-text v-if="_showBiography" v-bind="_attrs" class="pb-1"/>
    <v-divider></v-divider>
    <biography-card-actions v-bind="_attrs" v-on="$listeners"/>
    <biography-comments
      v-if="showComments"
      v-bind="_attrs"
      v-on="listeners"
    />
  </v-card>
</template>

<script>
const BiographyCardActions = () => import('./BiographyCardActions')
const BiographyCardText = () => import('./BiographyCardText')
const BiographyComments = () => import('./BiographyComments')
const BiographyCardTitle = () => import('./BiographyCardTitle')

export default {
  name: 'BiographyCard',
  inheritAttrs: false,
  data () {
    return {
      availableMore: false,
      options: {
        duration: 300,
        offset: 0,
        easing: 'easeInOutCubic'
      }
    }
  },
  props: {
    live: {
      type: Boolean,
      default: false
    },
    bio: String,
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
  created () {
    let that = this

    if (this.$route.hash) {
      this.$nextTick(function () {
        that.$vuetify.goTo(that.$route.hash, that.options)
      })
    }
  },
  computed: {
    _showBiography () {
      return !!this.bio
    },
    _attrs () {
      return Object.assign({},
        this.$attrs,
        {
          commentsCount: this.commentsCount,
          likesCount: this.likesCount,
          availableMore: this.availableMore,
          bio: this.bio
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
  components: {
    BiographyComments,
    BiographyCardActions,
    BiographyCardTitle,
    BiographyCardText
  }
}
</script>

<style scoped>
</style>
