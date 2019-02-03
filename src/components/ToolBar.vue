<template>
  <v-toolbar
    color="blue darken-3"
    :class="{ 'md-toolbar': $vuetify.breakpoint.mdAndUp }"
    dark
    app
    fixed
    dense
  >
    <v-toolbar-title class="ml-0">
      <div v-if="$vuetify.breakpoint.smAndDown">
        <v-toolbar-side-icon @click.stop="$emit('update:drawer', !drawer)"></v-toolbar-side-icon>
        <router-link to="/" class="title pl-2 white--text">Библиография</router-link>
      </div>
      <div class="d-flex align-center" v-else>
          <svg
            xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
            width="36" height="36"
            viewBox="0 0 224 224"
            style=" fill:#000000;">
            <g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt"
               stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0"
               font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal">
              <path d="M0,224v-224h224v224z" fill="none"></path>
              <g fill="#ffffff">
                <path
                  d="M112,18.66667c-51.43603,0 -93.33333,41.89731 -93.33333,93.33333c0,51.43603 41.89731,93.33333 93.33333,93.33333c51.43603,0 93.33333,-41.89731 93.33333,-93.33333c0,-51.43603 -41.89731,-93.33333 -93.33333,-93.33333zM112,37.33333c41.34781,0 74.66667,33.31886 74.66667,74.66667c0,41.34781 -33.31885,74.66667 -74.66667,74.66667c-41.34781,0 -74.66667,-33.31885 -74.66667,-74.66667c0,-41.34781 33.31886,-74.66667 74.66667,-74.66667zM84.25521,74.66667v74.66667h28.56511c8.61467,0 15.23958,-1.855 19.90625,-5.54167c4.66667,-3.68667 7,-9.15425 7,-16.40625c0,-1.81068 -0.23538,-3.57803 -0.69271,-5.30469c-0.45733,-1.72667 -1.19773,-3.31961 -2.20573,-4.79427c-1.008,-1.47467 -2.28768,-2.77214 -3.84635,-3.88281c-1.55867,-1.11067 -3.43059,-1.9285 -5.61459,-2.47917c1.848,-0.71867 3.44138,-1.62371 4.77604,-2.73438c1.32533,-1.11067 2.43148,-2.34675 3.29948,-3.71875c0.87733,-1.372 1.52118,-2.84346 1.95052,-4.41146c0.42933,-1.568 0.63802,-3.21388 0.63802,-4.92188c0,-3.49066 -0.6087,-6.51146 -1.85937,-9.07812c-1.24133,-2.56667 -3.05229,-4.7091 -5.4323,-6.39844c-2.37067,-1.68933 -5.27931,-2.93387 -8.69531,-3.75521c-3.416,-0.82133 -7.30844,-1.23958 -11.64844,-1.23958zM99.65885,87.13542h10.75521c4.23733,0 7.34577,0.73996 9.31511,2.22396c1.96933,1.484 2.95312,3.9219 2.95312,7.3099c0,2.94 -0.96687,5.21282 -2.8802,6.79948c-1.92267,1.58666 -4.8389,2.41383 -8.76824,2.47916h-11.375zM99.64062,116.79427h13.7448c1.94132,0 3.63125,0.25317 5.03125,0.72917c1.4,0.48533 2.54085,1.17279 3.40885,2.07812c0.868,0.90533 1.50339,2.00259 1.91406,3.28125c0.41067,1.27867 0.6198,2.7332 0.6198,4.33853c0,1.4 -0.23538,2.67925 -0.69271,3.86459c-0.45733,1.18533 -1.17148,2.21273 -2.13282,3.08073c-0.96133,0.87733 -2.15381,1.56523 -3.59114,2.05989c-1.428,0.49467 -3.14373,0.74739 -5.12239,0.74739h-13.17969v-20.16146z"></path>
              </g>
            </g>
          </svg>
        <router-link to="/" class="title pl-2 white--text">Библиография</router-link>
      </div>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-sm-and-down">
      <v-menu
        v-if="isAuthenticated"
        min-width="200px"
        offset-y
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
      <v-btn v-else icon @click="$router.push('/signIn')">
        <v-icon>fas fa-sign-in-alt</v-icon>
      </v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'ToolBar',
  props: {
    drawer: Boolean
  },
  computed: {
    ...mapGetters([
      'getUser',
      'isAuthenticated'
    ]),
    _firstName () {
      return this.getUser.biography.firstName
    }
  },
  methods: {
    signOut () {
      this.$store.dispatch('signOut')
        .then(
          () => {
            this.$router.push('/signIn')
          },
          e => {
            console.log(e)
          }
        )
    }
  }
}
</script>

<style>
  .md-toolbar > div {
    width: 960px !important;
    margin: auto !important;
    padding: 0 !important;
  }
</style>
