<template>
  <v-menu>
    <v-btn
      slot="activator"
      color="blue darken-3"
      flat
      icon
    >
      <v-icon>fas fa-angle-down</v-icon>
    </v-btn>
    <v-list>
      <v-list-tile
        @click="toBiography"
      >
        <v-list-tile-title>Редактировать</v-list-tile-title>
      </v-list-tile>
      <v-list-tile
        @click="fixDialogVisible = true"
      >
        <v-list-tile-title>Предложить исправление</v-list-tile-title>
      </v-list-tile>
    </v-list>
    <create-fix-suggest-dialog
      :biography-id="id"
      :visible.sync="fixDialogVisible"
    ></create-fix-suggest-dialog>
  </v-menu>
</template>

<script>
import CreateFixSuggestDialog from '../../dialog/CreateFixSuggestDialog.vue'
import CreateReportDialog from '../../dialog/CreateReportDialog.vue'

export default {
  name: 'BiographyCardMenu',
  data () {
    return {
      fixDialogVisible: false,
      reportDialogVisible: false
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
    CreateFixSuggestDialog,
    CreateReportDialog
  }
}
</script>

<style scoped>

</style>
