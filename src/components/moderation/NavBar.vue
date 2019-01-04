<template>
  <v-navigation-drawer
    class="md-drawer"
    fixed
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
        @click="click(4, 'approved')"
      >
        <v-list-tile-content>
          <v-list-tile-title>Одобренные</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile
        :class="{ active: clickedIndex === 5 }"
        href=""
        @click="click(5, 'rejected')"
      >
        <v-list-tile-content>
          <v-list-tile-title>Отклоненные</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: 'NavBar',
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
  .md-drawer {
    height: auto !important;
    top: auto !important;
    z-index: inherit;
    width: 240px !important;
    left: unset !important;
  }

  .active {
    border-left: 4px solid #1565C0 !important;
  }
</style>
