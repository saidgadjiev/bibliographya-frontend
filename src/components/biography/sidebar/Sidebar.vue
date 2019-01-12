<template>
  <v-navigation-drawer
    class="md-drawer"
    fixed
  >
    <v-list dense class="white">
      <v-list-tile
        :class="{ active: clickedIndex === 1 }"
        href=""
        @click="click(1, 'new')"
      >
        <v-list-tile-content>
          <v-list-tile-title>Новые</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile
        :class="{ active: clickedIndex === 2 }"
        href=""
        @click="click(2, 'last-update')"
      >
        <v-list-tile-content>
          <v-list-tile-title>Обновленные</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
    <v-list dense class="mt-1 white">
      <v-list-tile>
          <v-switch
            v-model="autobiographies"
            label="Автобиографии"
            color="primary"
          ></v-switch>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: 'Sidebar',
  data () {
    return {
      clickedIndex: 1,
      autobiographies: false
    }
  },
  methods: {
    click (index, action) {
      this.clickedIndex = index
      this.$emit(action)
    }
  },
  watch: {
    autobiographies (newVal) {
      this.$emit('autobiographies', newVal)
    }
  }
}
</script>

<style scoped>
  .active {
    border-left: 4px solid #1565C0 !important;
  }
  .md-drawer {
    height: auto !important;
    top: auto !important;
    z-index: inherit;
    width: 240px !important;
    left: unset !important;
    background-color: inherit !important;
  }
</style>
