<template>
  <v-menu>
    <v-btn
      slot="activator"
      class="absolute-activator"
      absolute
      right
      icon
    >
      <v-icon color="blue darken-3">{{ _icon }}</v-icon>
    </v-btn>
    <v-list>
      <v-list-tile
        @click="remove"
      >
        <v-list-tile-title>Удалить</v-list-tile-title>
      </v-list-tile>
      <v-list-tile
        @click="edit"
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
import biographyService from '../../../services/biography-service'
import CreateFixSuggestDialog from '../../dialog/CreateFixSuggestDialog.vue'
import CreateReportDialog from '../../dialog/CreateReportDialog.vue'

export default {
  name: 'BiographyCardMenu',
  inheritAttrs: false,
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
  computed: {
    _icon () {
      if (this.$vuetify.breakpoint.mdAndUp) {
        return 'fas fa-angle-down'
      }

      return 'fas fa-ellipsis-h'
    }
  },
  methods: {
    remove () {
      let that = this

      biographyService.deleteBiography(this.id)
        .then(
          () => {
            that.$emit('biography-removed', that.id)
          }
        )
    },
    edit () {
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
  .absolute-activator {
    top: 10px;
  }
</style>
