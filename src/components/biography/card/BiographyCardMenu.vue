<template>
  <v-menu>
    <v-btn
      slot="activator"
      icon
    >
      <v-icon>fas fa-caret-down</v-icon>
    </v-btn>
    <v-list>
      <v-list-tile
        @click="toBiography"
      >
        <v-list-tile-title>Редактировать</v-list-tile-title>
      </v-list-tile>
      <v-list-tile>
        <v-list-tile-title>Предложить исправление</v-list-tile-title>
      </v-list-tile>
    </v-list>
  </v-menu>
</template>

<script>
export default {
  name: 'BiographyCardMenu',
  props: {
    id: {
      type: Number,
      required: true
    }
  },
  methods: {
    toBiography () {
      this.$router.push('/edit/biography/' + this.id)
    }
  }
}
</script>

<style scoped>

</style>
