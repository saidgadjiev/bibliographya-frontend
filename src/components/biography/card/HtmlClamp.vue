<template>
  <div>
    <p class="word-break-word bio" style="font-size: 15px" v-html="source"></p>
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
  .bio >>> img {
    max-width: 100% !important;
    height: auto !important;
    width: auto !important;
  }
</style>
