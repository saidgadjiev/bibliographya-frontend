<template>
  <v-toolbar
    style="z-index: 9"
    color="blue darken-3"
    :class="{ 'md-toolbar': $vuetify.breakpoint.mdAndUp }"
    dark
    app
    fixed
    dense
    :height="50"
  >
    <v-toolbar-title class="ml-0">
      <div v-if="$vuetify.breakpoint.smAndDown">
        <router-link
          class="title"
          v-if="$routerHistory.hasPrevious()"
          :to="{ path: $routerHistory.previous().path }">
          <v-btn icon>
          <v-icon>
            fas fa-arrow-left
          </v-icon>
          </v-btn>
        </router-link>
        <v-toolbar-side-icon v-else @click.stop="doDrawer"></v-toolbar-side-icon>
        <router-link to="/" class="title pl-2 white--text font-weight-light">{{ getTitle }}</router-link>
      </div>
      <div style="height: 50px; width: 290px" v-else>
        <div class="d-inline-flex align-center" style="height: 100%">
          <bibliographya-icon/>
        <router-link to="/" class="title pl-2 white--text font-weight-regular">{{ getTitle }}</router-link>
      </div>
      </div>
    </v-toolbar-title>
    <v-text-field
      v-if="$vuetify.breakpoint.mdAndUp && isShowSearch"
      hide-details
      solo
      flat
      light
      placeholder="Поиск"
      single-line
      height="30"
      class="search-field"
      v-model="searchQuery"
      @input="_throttleSearch"
    >
      <template #prepend-inner>
        <v-icon small color="blue darken-3">fas fa-search</v-icon>
      </template>
    </v-text-field>
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-sm-and-down">
      <v-menu
        v-if="isAuthenticated"
        min-width="200px"
        offset-y
        left
        origin="center center"
        transition="scale-transition"
      >
        <v-btn flat class="white--text" slot="activator" style="text-transform: none">
          {{ _firstName }}
          <v-icon right dark>fas fa-user</v-icon>
        </v-btn>
        <v-list>
          <v-list-tile @click="$router.push('/profile/' + getUser.id)">
            <v-list-tile-action>
              <v-icon>fas fa-home</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Моя биография</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-divider></v-divider>
          <v-list-tile @click="signOut">
            <v-list-tile-action>
              <v-icon>fa-sign-out-alt</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Выйти</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-menu>
      <v-list-tile v-else-if="_isConfirmation" @click="cancelSignUp">
        <v-list-tile-content>
          <v-list-tile-title>Выйти</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile v-else to="/signIn" active-class="">
        <v-list-tile-content>
          <v-list-tile-title>Войти</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
import { mapGetters } from 'vuex'
import { SIGN_OUT, CANCEL_SIGN_UP } from '../../store/action-types'
import { SET_DRAWER } from '../../store/mutation-types'
import EventBus, { SEARCH } from '../../eventbus/eventbus'
import utils from '../../assets/js/utils'
import BibliographyaIcon from '../../components/icon/BibliographyaIcon'

export default {
  name: 'ToolBar',
  components: { BibliographyaIcon },
  data () {
    return {
      searchQuery: '',
      timer: null
    }
  },
  computed: {
    ...mapGetters([
      'getFirstName',
      'isAuthenticated',
      'drawer',
      'isShowSearch',
      'getTitle'
    ]),
    _firstName () {
      return this.getFirstName
    },
    _isConfirmation () {
      return this.$route.name === 'signUpConfirm'
    },
    _throttleSearch () {
      return utils.throttle(this.search, 300)
    }
  },
  methods: {
    search () {
      EventBus.$emit(SEARCH, this.searchQuery)
    },
    cancelSignUp () {
      this.$store.dispatch(CANCEL_SIGN_UP)
      this.$router.push('/')
    },
    doDrawer () {
      this.$store.commit(SET_DRAWER, !this.drawer)
    },
    signOut () {
      this.$store.dispatch(SIGN_OUT)
        .then(
          () => {
            this.$router.push('/signIn')
          }
        )
    }
  },
  watch: {
    isShowSearch () {
      this.searchQuery = undefined
    }
  }
}
</script>

<style scoped>
  .search-field >>> .v-input__control {
    min-height: unset !important;
  }

  .search-field >>> .v-input__slot {
    border-radius: 30px !important;
    width: 260px;
  }

  .md-toolbar >>> .v-toolbar__content {
    width: 1160px !important;
    margin: auto !important;
    padding: 0 !important;
  }
</style>
