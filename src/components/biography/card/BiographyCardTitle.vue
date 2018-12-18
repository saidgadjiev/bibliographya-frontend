<template>
  <v-card-title>
  <div>
    <div>
    <span v-for="(category, index) in categories" :key="index">
      <a :href="'#/category/' + category">{{ category }}</a>&nbsp;&nbsp;
    </span>
    </div>
    <div>{{ fullName }}</div>
  </div>
    <v-spacer></v-spacer>
    <biography-card-menu v-bind="$attrs"/>
  </v-card-title>
</template>

<script>
import BiographyCardMenu from '../card/BiographyCardMenu'

export default {
  name: 'BiographyCardTitle',
  props: {
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
      return this.lastName + ' ' + this.firstName + ' ' + this.middleName
    }
  },
  components: {
    BiographyCardMenu
  }
}
</script>

<style scoped>

</style>
