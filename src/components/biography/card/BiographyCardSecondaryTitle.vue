<template>
  <v-card-text v-if="_hasVisibleItems">
    <span v-for="(category, index) in categories" :key="index">
      <router-link class="bibliographya-a" :to="'/categories/' + category.id">{{ category.name }}</router-link>&nbsp;&nbsp;
    </span>
    <h4 v-if="_isNotAutobiography">
      Автор:
      <router-link class="bibliographya-a word-break-all" :to="_creatorBiographyLink">{{ _creatorName }}</router-link>
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
    userId: {
      type: Number
    },
    creator: {
      type: Object
    }
  },
  computed: {
    _creatorBiographyLink () {
      if (this.creator) {
        return '/biographies/' + this.creator.id
      }

      return ''
    },
    _creatorName () {
      return this.creator.firstName + ' ' + this.creator.lastName
    },
    _isNotAutobiography () {
      return !this.userId
    },
    _hasVisibleItems () {
      return (this.categories && this.categories.length > 0) || this._isNotAutobiography
    }
  }
}
</script>

<style scoped>

</style>
