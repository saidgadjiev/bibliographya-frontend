<template>
  <v-textarea
    :readonly="readonly"
    rows="20"
    v-model="getBiography"
    label="Биография"
    type="text"
  ></v-textarea>
</template>

<script>
export default {
  name: 'EditBiography',
  props: {
    biography: {
      type: String,
      required: true
    },
    readonly: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    getBiography: {
      get () {
        return this.biography
      },
      set (val) {
        this.$emit('update:biography', val)
      }
    }
  }
}
</script>

<style scoped>

</style>
