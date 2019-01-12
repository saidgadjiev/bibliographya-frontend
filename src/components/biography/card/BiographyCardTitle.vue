<template>
  <v-card-title>
    <div>
      <div>
    <span v-for="(category, index) in categories" :key="index">
      <a :href="'/category/' + category">{{ category }}</a>&nbsp;&nbsp;
    </span>
      </div>
      {{ fullName }}
      <v-icon small color="blue darken-3" class="pl-1">
        fas fa-check-circle
      </v-icon>
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
