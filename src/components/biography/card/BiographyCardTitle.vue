<template>
  <v-card-title class="biography-card-title">
    <span v-for="(category, index) in categories" :key="index">
      <router-link class="bibliographya-a" :to="'/category/' + category">{{ category }}</router-link>&nbsp;&nbsp;
    </span>
    <h2 class="word-break">{{ fullName }}
    </h2>
    <v-icon v-if="_isMarked" small color="blue darken-3" class="pl-1">mdi-check-decagram</v-icon>
    <biography-card-menu v-bind="$attrs" v-on="$listeners"/>
  </v-card-title>
</template>

<script>
import BiographyCardMenu from '../card/BiographyCardMenu'
import { PUBLISH_STATUS } from '../../../config'

export default {
  name: 'BiographyCardTitle',
  inheritAttrs: false,
  props: {
    isAutobiography: Boolean,
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
    categories: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  computed: {
    _isMarked () {
      return this.isAutobiography && this.publishStatus === PUBLISH_STATUS.PUBLISHED
    },
    fullName () {
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
