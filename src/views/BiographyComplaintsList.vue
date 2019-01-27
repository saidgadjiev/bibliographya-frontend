<template>
  <list
    :infinite-load="infiniteLoad"
  >
    <template slot="item" slot-scope="{ item }">
      <v-card>
        <biography-report-title v-bind="item"/>
      </v-card>
    </template>
  </list>
</template>

<script>
import biographyReportService from '../services/biography-report-service'
import List from '../components/list/List'
import BiographyReportTitle from '../components/complaint/card/BiographyComplaintTitle'

export default {
  name: 'BiographyComplaintsList',
  methods: {
    infiniteLoad (limit, offset) {
      return biographyReportService.getReports(limit, offset)
    }
  },
  components: {
    List,
    BiographyReportTitle
  }
}
</script>

<style scoped>

</style>
