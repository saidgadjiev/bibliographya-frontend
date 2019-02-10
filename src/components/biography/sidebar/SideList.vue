<template>
    <v-card :style="_cardStyles">
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
      <v-divider v-if="$vuetify.breakpoint.smAndDown"></v-divider>
      <v-list dense class="white mt-1">
        <v-list-tile>
          <v-list-tile-action>
            <v-switch
            v-model="autobiographies"
            color="primary"
          ></v-switch>
          </v-list-tile-action>
          <v-list-tile-title>Автобиографии</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-card>
</template>

<script>
export default {
  name: 'SideList',
  data () {
    return {
      clickedIndex: 1,
      autobiographies: false
    }
  },
  computed: {
    _cardStyles () {
      if (this.$vuetify.breakpoint.mdAndUp) {
        return {
          'background-color': 'transparent'
        }
      }

      return {}
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
</style>
