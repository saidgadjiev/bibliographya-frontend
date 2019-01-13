<template>
  <div>
    <p v-html="_source"></p>
    <router-link v-if="clamp" :to="clampLink" class="bibliographya-a">{{ clampLinkLabel }}</router-link>
  </div>
</template>

<script>
import h2t from 'html-truncate'

export default {
  name: 'Clamp',
  props: {
    type: {
      type: String,
      default: 'html'
    },
    source: {
      type: String
    },
    clamp: {
      type: Boolean,
      default: true
    },
    clampSize: {
      type: Number
    },
    clampLink: {
      type: String
    },
    clampLinkLabel: {
      type: String
    }
  },
  computed: {
    _source () {
      if (this.clamp) {
        return h2t(this.source, this.clampSize, undefined)
      }

      return this.source
    }
  }
}
</script>

<style scoped>
</style>
