<template>
  <v-card-title class="biography-card-title">
    <span v-for="(category, index) in categories" :key="index">
      <a :href="'/category/' + category">{{ category }}</a>&nbsp;&nbsp;
    </span>
    <h2 class="word-break">{{ fullName }}
    </h2>
    <v-icon v-if="isAutobiography" small color="blue darken-3" class="pl-1">mdi-check-decagram</v-icon>
    <biography-card-menu v-bind="$attrs" v-on="$listeners"/>
  </v-card-title>
</template>

<script>
import BiographyCardMenu from '../card/BiographyCardMenu'

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
