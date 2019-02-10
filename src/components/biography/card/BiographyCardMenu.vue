<template>
  <v-menu left>
    <v-btn
      slot="activator"
      class="absolute-activator"
      absolute
      right
      icon
    >
      <v-icon :small="$vuetify.breakpoint.smAndDown" color="blue darken-3">{{ _icon }}</v-icon>
    </v-btn>
    <v-list >
      <v-list-tile
        v-if="_showDelete"
        @click="remove"
      >
        <v-list-tile-title>Удалить</v-list-tile-title>
      </v-list-tile>
      <v-list-tile
        v-if="_showEdit"
        @click="edit"
      >
        <v-list-tile-title>Редактировать</v-list-tile-title>
      </v-list-tile>
      <v-list-tile
        v-if="_showSuggest"
        @click="suggestFix"
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
import { mapGetters } from 'vuex'
import { ROLES } from '../../../config'
import biographyService from '../../../services/biography-service'
import CreateFixSuggestDialog from '../../fix/dialog/CreateFixSuggestDialog.vue'

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
    },
    creatorId: {
      type: Number
    },
    userId: {
      type: Number
    }
  },
  computed: {
    ...mapGetters([
      'getUser',
      'isAuthenticated',
      'isAuthorized'
    ]),
    _showDelete () {
      if (this.userId) {
        return false
      }
      if (!this.isAuthenticated) {
        return false
      }
      if (this.isAuthorized([ROLES.ROLE_MODERATOR])) {
        return true
      }
      if (this.getUser.id === this.creatorId) {
        return true
      }

      return false
    },
    _showEdit () {
      if (!this.isAuthenticated) {
        return false
      }
      if (this.isAuthorized([ROLES.ROLE_MODERATOR])) {
        return true
      }
      if (this.getUser.id === this.creatorId) {
        return true
      }

      return false
    },
    _showSuggest () {
      if (!this.isAuthenticated) {
        return true
      }

      return this.creatorId !== this.getUser.id
    },
    _icon () {
      if (this.$vuetify.breakpoint.mdAndUp) {
        return 'fas fa-angle-down'
      }

      return 'fas fa-ellipsis-h'
    }
  },
  methods: {
    suggestFix () {
      if (!this.isAuthenticated) {
        this.$router.push('/signIn')
      }

      this.fixDialogVisible = true
    },
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
      this.$router.push('/edit/biographies/' + this.id)
    }
  },
  components: {
    CreateFixSuggestDialog
  }
}
</script>

<style scoped>
  .absolute-activator {
    top: 10px;
  }
</style>
