<template>
  <v-card>
    <v-list>
      <v-list-tile>
        <v-list-tile-action>
          <v-combobox
            clearable
            class="ma-0 pa-0"
            hide-details
            :items="roles"
            label="Выберите роль"
            v-on="$listeners"
          ></v-combobox>
        </v-list-tile-action>
      </v-list-tile>
    </v-list>
  </v-card>
</template>

<script>
export default {
  name: 'SideCard',
  inheritAttrs: false,
  props: {
    roles: {
      type: Array,
      default: function () {
        return []
      }
    }
  }
}
</script>

<style scoped>

</style>
