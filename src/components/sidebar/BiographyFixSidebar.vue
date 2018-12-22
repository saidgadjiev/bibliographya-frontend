<template>
  <v-navigation-drawer
    :width="240"
    :height="null"
    fixed
    style="top: auto"
  >
    <v-list dense>
      <v-list-tile
        :class="{ active: clickedIndex === 1 }"
        href=""
        @click="click(1, 'all')"
      >
        <v-list-tile-content>
          <v-list-tile-title>Все</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile
        :class="{ active: clickedIndex === 2 }"
        href=""
        @click="click(2, 'not-assigned')"
      >
        <v-list-tile-content>
          <v-list-tile-title>Не назначенные</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile
        :class="{ active: clickedIndex === 3 }"
        href=""
        @click="click(3, 'assigned-me')"
      >
        <v-list-tile-content>
          <v-list-tile-title>Назначенные мне</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile
        :class="{ active: clickedIndex === 4 }"
        href=""
        @click="click(4, 'closed')"
      >
        <v-list-tile-content>
          <v-list-tile-title>Закрытые</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: 'BiographyFixSidebar',
  data () {
    return {
      clickedIndex: 1
    }
  },
  methods: {
    click (index, action) {
      this.clickedIndex = index
      this.$emit(action)
    }
  }
}
</script>

<style scoped>
  .active {
    border-left: 4px solid #1565C0 !important;
  }
</style>
