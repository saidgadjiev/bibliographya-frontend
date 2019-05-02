<template>
  <div>
    <p class="word-break-word biography-content" :style="{ 'font-size': _fontSize + 'px' }" :class="_classes" v-html="source"></p>
    <router-link v-if="clamp" :to="clampLink" class="bib-a font-weight-medium subheading">
      {{ clampLinkLabel }}
    </router-link>
  </div>
</template>

<script>
import { BIOGRAPHY_CARD_MODE } from '../../../config'

export default {
  name: 'HtmlClamp',
  inheritAttrs: false,
  props: {
    mode: {
      type: String,
      default: BIOGRAPHY_CARD_MODE.LIST
    },
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
  },
  computed: {
    _classes () {
      return this.mode === BIOGRAPHY_CARD_MODE.LIST ? 'list-tipography' : ''
    },
    _fontSize () {
      return this.mode === BIOGRAPHY_CARD_MODE.LIST ? 14 : 14
    }
  }
}
</script>

<style scoped>
  .list-tipography >>> h1 {
    font-size: 1.25em !important;
  }

  .list-tipography >>> h2 {
    font-size: 1.25em !important;
  }

  .list-tipography >>> h3 {
    font-size: 1.12em !important;
  }
</style>
