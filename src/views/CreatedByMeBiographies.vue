<template>
  <list
    :infinite-load="infiniteLoad"
  >
    <template slot="item" slot-scope="{ item }">
      <biography-created-by-me-card
        v-bind.sync="item"
      ></biography-created-by-me-card>
    </template>
  </list>
</template>

<script>
import List from '../components/list/List'
import biographyService from '../services/biography-service'
import BiographyCreatedByMeCard from '../components/biography/BiographyCreatedByMeCard'

export default {
  methods: {
    infiniteLoad (limit, offset) {
      return biographyService.getMyBiographies(limit, offset)
    }
  },
  components: {
    List,
    BiographyCreatedByMeCard
  }
}
</script>

<style scoped>

</style>
