<template>
  <v-card-title class="biography-card-title">
    <span v-for="(category, index) in categories" :key="index">
      <router-link class="bibliographya-a" :to="'/category/' + category">{{ category }}</router-link>&nbsp;&nbsp;
    </span>
    <div v-if="_isAutobiography">
    <span class="word-break">
      Автор: {{ _creatorName }}
    </span>
    </div>
    <h2 class="word-break">{{ _fullName }}
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
    categories: {
      type: Array,
      default: function () {
        return []
      }
    },
    creatorBiography: {
      type: Object,
      required: true
    }
  },
  computed: {
    _isMarked () {
      return this.userId && this.publishStatus === PUBLISH_STATUS.PUBLISHED
    },
    _fullName () {
      let full = this.lastName + ' ' + this.firstName
      if (this.middleName) {
        return full + ' ' + this.middleName
      }

      return full
    },
    _creatorName () {
      return this.creatorBiography.firstName + ' ' + this.creatorBiography.lastName
    },
    _isAutobiography () {
      return !!this.userId
    }
  },
  components: {
    BiographyCardMenu
  }
}
</script>

<style scoped>
</style>
