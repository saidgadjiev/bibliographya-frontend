<template>
  <div>
    <p class='word-break-word' style="font-size: 15px" v-html="source"></p>
    <router-link v-if="clamp" :to="clampLink" class="bib-a h4 font-weight-bold subheading">
      {{ clampLinkLabel }}
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'HtmlClamp',
  inheritAttrs: false,
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
    clampLink: {
      type: String
    },
    clampLinkLabel: {
      type: String
    }
  }
}
</script>

<style scoped>
</style>
