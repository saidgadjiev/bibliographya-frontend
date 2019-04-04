<template>
  <v-navigation-drawer
    class="grey lighten-4"
    fixed
    app
    v-model="_drawer"
  >
    <v-toolbar flat class="transparent pt-3 pb-3" v-if="isAuthenticated">
      <div>
        <span class="font-weight-light headline user-name">{{ _fullName }}</span>
      </div>
    </v-toolbar>
    <nav-list/>
  </v-navigation-drawer>
</template>

<script>
import { mapGetters } from 'vuex'
import request from '../../mixins/request'
import alert from '../../mixins/alert'
import { SET_DRAWER } from '../../store/mutation-types'
import NavList from './NavList'

export default {
  name: 'NavBar',
  components: { NavList },
  mixins: [request, alert],
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
      return this.getFirstName + ' ' + this.getLastName
    },
    _drawer: {
      get () {
        return this.drawer
      },
      set (val) {
        this.$store.commit(SET_DRAWER, val)
      }
    }
  }
}
</script>

<style scoped>
  .user-name {
    word-break: break-all !important;
  }

  .md-drawer {
    transform: none !important;
    height: auto !important;
    z-index: inherit;
    width: 240px !important;
    left: unset !important;
    background-color: inherit !important;
  }

</style>
