<template>
  <list
    :infinite-id="infiniteId"
    :infinite-load="infiniteLoad"
  >
    <template slot="item" slot-scope="{ item }">
      <feedback-card v-bind="item"></feedback-card>
    </template>
    <template slot="sidebar">
      <div></div>
    </template>
    <template slot="no-results">
      <v-card>
        <v-card-text>
          <h4>Отзывов нет.</h4>
        </v-card-text>
      </v-card>
    </template>
  </list>
</template>

<script>
import feedbackService from '../services/feedback-service'
import List from '../components/list/List'
import FeedbackCard from '../components/feedback/FeedbackCard'
import { TITLE } from '../config'

export default {
  name: 'FeedbackList',
  components: { FeedbackCard, List },
  data () {
    return {
      infiniteId: +new Date()
    }
  },
  metaInfo: {
    title: TITLE.REVIEWS
  },
  methods: {
    infiniteLoad (limit, offset) {
      return feedbackService.getList(limit, offset)
        .then(
          response => {
            if (response.status === 200) {
              response.data.content.forEach(function (val) {
                val.flex = 12
              })
            }

            return response
          }
        )
    }
  }
}
</script>

<style scoped>

</style>
