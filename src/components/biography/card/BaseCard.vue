<template>
    <v-card>
      <v-card-title>
        <slot name="title">
        </slot>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <slot name="text">
        </slot>
      </v-card-text>
      <slot name="titleDivider">
        <v-divider></v-divider>
      </slot>
      <v-card-actions v-if="hasActionsSlot">
        <slot name="actions">
        </slot>
      </v-card-actions>
    </v-card>
</template>

<script>
export default {
  name: 'Card',
  props: {
    showActions: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    hasActionsSlot () {
      return !!this.$slots.actions
    }
  }
}
</script>

<style scoped>

</style>
