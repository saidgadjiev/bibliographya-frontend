<template>
  <v-card-text v-if="_hasVisibleItems">
    <span v-for="(category, index) in categories" :key="index">
      <router-link class="bibliographya-a" :to="'/category/' + category">{{ category }}</router-link>&nbsp;&nbsp;
    </span>
    <h4 v-if="_isNotAutobiography">
      Автор:
      <router-link class="bibliographya-a word-break" :to="_creatorBiographyLink">{{ _creatorName }}</router-link>
    </h4>
  </v-card-text>
</template>

<script>
export default {
  name: 'BiographyCardSecondaryTitle',
  inheritAttrs: false,
  props: {
    categories: {
      type: Array,
      default: function () {
        return []
      }
    },
    creatorBiography: {
      type: Object
    }
  },
  computed: {
    _creatorBiographyLink () {
      if (this.creatorBiography) {
        return '/biography/' + this.creatorBiography.id
      }

      return ''
    },
    _creatorName () {
      return this.creatorBiography.firstName + ' ' + this.creatorBiography.lastName
    },
    _isNotAutobiography () {
      return !!this.userId
    },
    _hasVisibleItems () {
      return (this.categories && this.categories.length > 0) || this._isNotAutobiography
    }
  }
}
</script>

<style scoped>

</style>
