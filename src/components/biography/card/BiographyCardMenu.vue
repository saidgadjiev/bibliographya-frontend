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
      <v-list-tile
        @click="visible = true"
      >
        <v-list-tile-title>Предложить исправление</v-list-tile-title>
      </v-list-tile>
    </v-list>
    <create-fix-suggest-dialog
      :biography-id="id"
      :visible.sync="visible"
    ></create-fix-suggest-dialog>
  </v-menu>
</template>

<script>
import CreateFixSuggestDialog from '../../dialog/CreateFixSuggestDialog.vue'

export default {
  name: 'BiographyCardMenu',
  data () {
    return {
      visible: false
    }
  },
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
  },
  components: {
    CreateFixSuggestDialog
  }
}
</script>

<style scoped>

</style>
