<template>
  <v-navigation-drawer
    style="z-index: 10;"
    class="grey lighten-4"
    fixed
    app
    v-model="_drawer"
  >
    <vue-pull-to
      :top-load-method="loadAccount"
    >
    <v-toolbar flat class="transparent pt-3 pb-3" v-if="isAuthenticated" @click="$router.push('/profile/' + getUserId)">
      <div>
        <span class="font-weight-regular headline user-name">{{ _fullName }}</span>
      </div>
    </v-toolbar>
    <nav-list/>
    </vue-pull-to>
  </v-navigation-drawer>
</template>

<script>
import { mapGetters } from 'vuex'
import { SET_DRAWER } from '../../store/mutation-types'
import NavList from './NavList'
import VuePullTo from '../../components/pullTo/VuePullTo'
import { GET_ACCOUNT } from '../../store/action-types'

export default {
  name: 'NavBar',
  components: { VuePullTo, NavList },
  computed: {
    ...mapGetters([
      'getUserId',
      'getFirstName',
      'getLastName',
      'isAuthenticated',
      'isAuthorized',
      'drawer'
    ]),
    _fullName () {
      return this.getLastName + ' ' + this.getFirstName
    },
    _drawer: {
      get () {
        return this.drawer
      },
      set (val) {
        this.$store.commit(SET_DRAWER, val)
      }
    }
  },
  methods: {
    loadAccount (load) {
      this.$store.dispatch(GET_ACCOUNT)
        .finally(() => {
          load('done')
        })
    }
  }
}
</script>

<style scoped>
  .user-name {
    word-break: break-all !important;
  }
</style>
