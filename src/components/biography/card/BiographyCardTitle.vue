<template>
  <div>
    <span v-for="(category, index) in categories" :key="index">
      <a :href="'#/category/' + category">{{ category }}</a>&nbsp;&nbsp;
    </span>
    <br>
    <span>{{ fullName }}</span>
  </div>
</template>

<script>
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
  }
}
</script>

<style scoped>

</style>
