<template>
  <v-list-tile :id="'c' + comment.id">
    <v-list-tile-content>
      <v-list-tile-title v-if="comment.reply">
        <a tabindex>{{ comment.lastName + ' ' + comment.firstName }}</a>
        <small class="grey--text">ответил</small>
        <a tabindex @click="gotoReply()"><strong
          class="grey--text">{{comment.replyToFirstName}}</strong></a>
      </v-list-tile-title>
      <v-list-tile-title v-else>
        <a tabindex>{{ comment.lastName + ' ' + comment.firstName }}</a>
      </v-list-tile-title>
      <V-list-tile-sub-title class="text--primary" v-if="comment.reply">
        <a tabindex>{{ comment.replyToFirstName }}</a>{{ ', ' + comment.content }}
      </V-list-tile-sub-title>
      <V-list-tile-sub-title class="text--primary" v-else>
        {{ comment.content }}
      </V-list-tile-sub-title>
      <V-list-tile-sub-title>
        {{ getTimeDiff + ', ' }}<a tabindex @click="reply">Ответить</a>
      </V-list-tile-sub-title>
    </v-list-tile-content>
  </v-list-tile>
</template>

<script>
export default {
  name: 'Comment',
  data () {
    return {
      options: {
        duration: 300,
        offset: 0,
        easing: 'easeInOutCubic'
      }
    }
  },
  props: {
    comment: {
      required: true,
      type: Object
    },
    classes: {
      type: String
    }
  },
  computed: {
    getTimeDiff () {
      const date1 = new Date(this.comment.createdAt)
      const date2 = new Date(Date.now())
      const yearDiff = Math.abs(date2.getFullYear() - date1.getFullYear())
      const monthDiff = Math.abs(date2.getMonth() - date1.getMonth())
      const dayDiff = Math.abs(date2.getDate() - date1.getDate())
      const hourDiff = Math.abs(date2.getHours() - date1.getHours())
      const minuteDiff = Math.abs(date2.getMinutes() - date1.getMinutes())
      return yearDiff !== 0 && yearDiff === 1
        ? 'a year ago'
        : yearDiff > 1
          ? yearDiff + ' years ago'
          : monthDiff !== 0 && monthDiff === 1
            ? 'a month ago'
            : monthDiff > 1
              ? monthDiff + ' months ago'
              : dayDiff !== 0 && dayDiff === 1
                ? 'a day ago'
                : dayDiff > 1
                  ? dayDiff + ' days ago'
                  : hourDiff !== 0 && hourDiff === 1
                    ? 'a hour ago'
                    : hourDiff > 1
                      ? hourDiff + ' hours ago'
                      : minuteDiff !== 0 && minuteDiff === 1
                        ? 'a minute ago'
                        : minuteDiff > 1
                          ? minuteDiff + ' minutes ago'
                          : 'seconds ago'
    }
  },
  methods: {
    gotoReply () {
      this.$vuetify.goTo('#c' + this.comment.parentId, this.options)
      let el = document.getElementById('c' + this.comment.parentId)

      el.classList.add('blue-grey', 'lighten-3')

      setTimeout(function () {
        el.classList.remove('blue-grey', 'lighten-3')
      }, 2000)
    },
    reply () {
      this.$emit('click-reply', this.comment)
    }
  }
}
</script>

<style scoped>
</style>
