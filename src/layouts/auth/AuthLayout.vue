<template>
  <div>
    <toolbar/>
    <v-content>
      <v-container grid-list-lg fill-height :class="{ 'md-content' : $vuetify.breakpoint.mdAndUp }">
        <v-layout row fill-height class="mt-0 mb-0">
          <v-flex xs12>
            <router-view></router-view>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </div>
</template>

<script>
import Toolbar from './ToolBar'

export default {
  name: 'AuthLayout',
  components: {
    Toolbar
  }
}
</script>

<style scoped>

</style>
