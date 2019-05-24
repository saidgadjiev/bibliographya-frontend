<template>
    <v-card v-if="statistics">
      <v-card-title primary-title>
        <h3 class="headline font-weight-bold">Статистика</h3>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text class="subheading font-weight-bold">
        <div style="color: #3D5AFE">
          Количество пользователей:
          <span>{{ _usersStats.count }}</span>
        </div>
        <v-divider></v-divider>
        <div style="color: #00E676">
          Количество биографий:
          <span>{{ _biographiesStats.count }}</span>
        </div>
        <v-divider></v-divider>
        <div style="color: #AA00FF">
          Количество лайков:
          <span>{{ _likesStats.count }}</span>
        </div>
        <v-divider></v-divider>
        <div style="color: #F50057">
          Количество комментариев:
          <span>{{ _commentsStats.count }}</span>
        </div>
      </v-card-text>
    </v-card>
</template>

<script>
import statsService from '../services/stats-service'
import { TITLE } from '../config'

export default {
  name: 'Statistics',
  data () {
    return {
      statistics: undefined
    }
  },
  metaInfo: {
    title: TITLE.STATISTIC
  },
  computed: {
    _usersStats () {
      return this.statistics.usersStats
    },
    _likesStats () {
      return this.statistics.likesStats
    },
    _biographiesStats () {
      return this.statistics.biographiesStats
    },
    _commentsStats () {
      return this.statistics.commentsStats
    }
  },
  methods: {
    loadStats () {
      let that = this

      statsService.getStats()
        .then(
          response => {
            that.statistics = response.data
          },
          e => {

          }
        )
    }
  },
  created () {
    this.loadStats()
  }
}
</script>

<style scoped>

</style>
