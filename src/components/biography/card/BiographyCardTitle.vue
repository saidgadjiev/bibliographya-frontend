<template>
  <v-card-title class="biography-card-title">
    <span :class="_fullNameClasses" class="word-break-word">{{ _fullName }}
      <v-icon v-if="_isMarked" small color="blue darken-3" class="pb-1">mdi-check-decagram</v-icon>
    </span>
    <biography-card-menu v-if="showMenu" :user-id="userId" v-bind="$attrs" v-on="$listeners"/>
  </v-card-title>
</template>

<script>
import BiographyCardMenu from '../card/BiographyCardMenu'
import { PUBLISH_STATUS } from '../../../config'

export default {
  name: 'BiographyCardTitle',
  inheritAttrs: false,
  props: {
    userId: {
      type: Number
    },
    firstName: {
      type: String,
      default: ''
    },
    lastName: {
      type: String,
      default: ''
    },
    publishStatus: {
      type: Number
    },
    middleName: {
      type: String,
      default: ''
    },
    showMenu: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    _fullNameClasses () {
      if (this.$vuetify.breakpoint.mdAndUp) {
        return {
          'headline': true
        }
      }

      return {
        'title': true
      }
    },
    _isMarked () {
      return this.userId && this.publishStatus === PUBLISH_STATUS.PUBLISHED
    },
    _fullName () {
      let full = this.lastName + ' ' + this.firstName
      if (this.middleName) {
        return full + ' ' + this.middleName
      }

      return full
    }
  },
  components: {
    BiographyCardMenu
  }
}
</script>

<style scoped>
</style>
