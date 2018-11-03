<template>
  <v-expansion-panel
    v-model="defaultExpand"
    expand
  >
    <v-expansion-panel-content
      readonly
      expand-icon="fas fa-chevron-down"
    >
      <editable-fio v-bind="$attrs"></editable-fio>
    </v-expansion-panel-content>
    <v-expansion-panel-content
      expand-icon="fas fa-chevron-down"
    >
      <div slot="header">Биография</div>
      <editable-biography v-bind="$attrs"></editable-biography>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script>
import EditableFio from './EditableFio'
import EditableBiography from './EditableBiography'

export default {
  name: 'biography-card',
  data () {
    return {
      defaultExpand: [true, true]
    }
  },
  components: {
    EditableFio,
    EditableBiography
  }
}
</script>

<style scoped>

</style>
