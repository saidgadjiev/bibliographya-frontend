<template>
  <div class="vue-pull-to-wrapper">
    <div v-if="topLoadMethod">
      <div :style="{'min-height': direction === 'down' ? `${diff}px` : 0}" class="action-block">
        <div class="text-xs-center">
          <v-icon
            v-if="state === 'trigger' || state === 'pull'"
            :class="{'icon-arrow': state === 'trigger'}"
            color="light-blue darken-1"
            small
          >fas fa-arrow-down</v-icon>
          <progress-circular v-else :size="26" color="light-blue darken-1"></progress-circular>
        </div>
      </div>
    </div>
    <div class="scroll-container">
      <slot></slot>
    </div>
    <div v-if="bottomLoadMethod">
      <div style="position: fixed !important; bottom: 0;" :style="{'min-height': direction === 'up' ? `${Math.abs(diff)}px` : 0}" class="action-block">
        <div class="text-xs-center">
          <v-icon
            v-if="state === 'trigger' || state === 'pull'"
            :class="{'icon-arrow': state === 'trigger'}"
            color="light-blue darken-1"
            small
          >fas fa-arrow-up</v-icon>
          <progress-circular v-else :size="26" color="light-blue darken-1"></progress-circular>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { throttle } from '../../assets/js/pullto/utils'
import { TOP_DEFAULT_CONFIG, BOTTOM_DEFAULT_CONFIG } from '../../assets/js/pullto/config'
import ProgressCircular from '../progress/ProgressCircular'

export default {
  name: 'vue-pull-to',
  components: { ProgressCircular },
  props: {
    mode: {
      type: String,
      default: 'window-scroll'
    },
    distanceIndex: {
      type: Number,
      default: 2
    },
    topLoadMethod: {
      type: Function
    },
    bottomLoadMethod: {
      type: Function
    },
    isThrottleTopPull: {
      type: Boolean,
      default: true
    },
    isThrottleBottomPull: {
      type: Boolean,
      default: true
    },
    isThrottleScroll: {
      type: Boolean,
      default: true
    },
    isTopBounce: {
      type: Boolean,
      default: true
    },
    isBottomBounce: {
      type: Boolean,
      default: true
    },
    topConfig: {
      type: Object,
      default: () => {
        return {}
      }
    },
    bottomConfig: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data () {
    return {
      passiveSettings: undefined,
      scrollEl: null,
      startScrollTop: 0,
      startY: 0,
      startX: 0,
      currentY: 0,
      currentX: 0,
      distance: 0,
      direction: 0,
      diff: 0,
      beforeDiff: 0,
      topText: '',
      bottomText: '',
      state: '',
      bottomReached: false,
      throttleEmitTopPull: null,
      throttleEmitBottomPull: null,
      throttleEmitScroll: null,
      throttleOnInfiniteScroll: null
    }
  },
  computed: {
    _topConfig: function () {
      return Object.assign({}, TOP_DEFAULT_CONFIG, this.topConfig)
    },
    _bottomConfig: function () {
      return Object.assign({}, BOTTOM_DEFAULT_CONFIG, this.bottomConfig)
    }
  },
  watch: {
    state (val) {
      if (this.direction === 'down') {
        this.$emit('top-state-change', val)
      } else {
        this.$emit('bottom-state-change', val)
      }
    }
  },
  methods: {
    actionPull () {
      this.state = 'pull'
      this.direction === 'down'
        ? (this.topText = this._topConfig.pullText)
        : (this.bottomText = this._bottomConfig.pullText)
    },
    actionTrigger () {
      this.state = 'trigger'
      this.direction === 'down'
        ? (this.topText = this._topConfig.triggerText)
        : (this.bottomText = this._bottomConfig.triggerText)
    },
    actionLoading () {
      this.state = 'loading'
      if (this.direction === 'down') {
        this.topText = this._topConfig.loadingText
        /* eslint-disable no-useless-call */
        this.topLoadMethod.call(this, this.actionLoaded)
        this.scrollTo(this._topConfig.stayDistance)
      } else {
        this.bottomText = this._bottomConfig.loadingText
        this.bottomLoadMethod.call(this, this.actionLoaded)
        this.scrollTo(-this._bottomConfig.stayDistance)
      }
    },
    actionLoaded (loadState = 'done') {
      this.state = `loaded-${loadState}`
      let loadedStayTime
      if (this.direction === 'down') {
        this.topText =
            loadState === 'done'
              ? this._topConfig.doneText
              : this._topConfig.failText
        loadedStayTime = this._topConfig.loadedStayTime
      } else {
        this.bottomText =
            loadState === 'done'
              ? this._bottomConfig.doneText
              : this._bottomConfig.failText
        loadedStayTime = this._bottomConfig.loadedStayTime
      }
      setTimeout(() => {
        this.scrollTo(0)

        // reset state
        setTimeout(() => {
          this.state = ''
        }, 200)
      }, loadedStayTime)
    },
    scrollTo (y, duration = 200) {
      this.$el.style.transition = `${duration}ms`
      this.diff = y
      setTimeout(() => {
        this.$el.style.transition = ''
      }, duration)
    },

    checkBottomReached () {
      if (this.mode === 'element-scroll') {
        return (this.scrollEl.scrollTop + this.scrollEl.offsetHeight + 1 >=
            this.scrollEl.scrollHeight
        )
      }
      return window.scrollY + window.innerHeight >= document.scrollingElement.scrollHeight
    },

    handleTouchStart (event) {
      this.startY = event.touches[0].clientY
      this.startX = event.touches[0].clientX
      this.beforeDiff = this.diff

      if (this.mode === 'element-scroll') {
        this.startScrollTop = this.scrollEl.scrollTop
      } else {
        this.startScrollTop = window.scrollY
      }
      this.bottomReached = this.checkBottomReached()
    },

    handleTouchMove (event) {
      this.currentY = event.touches[0].clientY
      this.currentX = event.touches[0].clientX
      this.distance =
          (this.currentY - this.startY) / this.distanceIndex + this.beforeDiff
      // judge pan gesture direction, if not vertival just return
      // make sure that if some components embeded can handle horizontal pan gesture in here
      if (
        Math.abs(this.currentY - this.startY) <
          Math.abs(this.currentX - this.startX)
      ) {
        return
      }
      this.direction = this.distance > 0 ? 'down' : 'up'

      if (
        this.startScrollTop === 0 &&
          this.direction === 'down' &&
          this.isTopBounce
      ) {
        event.preventDefault()
        event.stopPropagation()
        this.diff = this.distance
        this.isThrottleTopPull
          ? this.throttleEmitTopPull(this.diff)
          : this.$emit('top-pull', this.diff)

        if (typeof this.topLoadMethod !== 'function') return

        if (
          this.distance < this._topConfig.triggerDistance &&
            this.state !== 'pull' &&
            this.state !== 'loading'
        ) {
          this.actionPull()
        } else if (
          this.distance >= this._topConfig.triggerDistance &&
            this.state !== 'trigger' &&
            this.state !== 'loading'
        ) {
          this.actionTrigger()
        }
      } else if (
        this.bottomReached &&
          this.direction === 'up' &&
          this.isBottomBounce
      ) {
        event.preventDefault()
        event.stopPropagation()
        this.diff = this.distance
        this.isThrottleBottomPull
          ? this.throttleEmitBottomPull(this.diff)
          : this.$emit('bottom-pull', this.diff)

        if (typeof this.bottomLoadMethod !== 'function') return

        if (
          Math.abs(this.distance) < this._bottomConfig.triggerDistance &&
            this.state !== 'pull' &&
            this.state !== 'loading'
        ) {
          this.actionPull()
        } else if (
          Math.abs(this.distance) >= this._bottomConfig.triggerDistance &&
            this.state !== 'trigger' &&
            this.state !== 'loading'
        ) {
          this.actionTrigger()
        }
      }
    },

    handleTouchEnd () {
      if (this.diff === 0) return
      if (this.state === 'trigger') {
        this.actionLoading()
        return
      }
      // pull cancel
      this.scrollTo(0)
    },

    handleScroll (event) {
      this.isThrottleScroll
        ? this.throttleEmitScroll(event)
        : this.$emit('scroll', event)
      this.throttleOnInfiniteScroll()
    },

    onInfiniteScroll () {
      if (this.checkBottomReached()) {
        this.$emit('infinite-scroll')
      }
    },

    throttleEmit (delay, mustRunDelay = 0, eventName) {
      const throttleMethod = function () {
        const args = [...arguments]
        args.unshift(eventName)
        this.$emit.apply(this, args)
      }

      return throttle(throttleMethod, delay, mustRunDelay)
    },
    bindEvents () {
      this.scrollEl.addEventListener('touchstart', this.handleTouchStart)
      this.scrollEl.addEventListener('touchmove', this.handleTouchMove, { passive: false })
      this.scrollEl.addEventListener('touchend', this.handleTouchEnd)
      this.scrollEl.addEventListener('scroll', this.handleScroll)
    },

    createThrottleMethods () {
      this.throttleEmitTopPull = this.throttleEmit(200, 300, 'top-pull')
      this.throttleEmitBottomPull = this.throttleEmit(200, 300, 'bottom-pull')
      this.throttleEmitScroll = this.throttleEmit(100, 150, 'scroll')
      this.throttleOnInfiniteScroll = throttle(this.onInfiniteScroll, 400)
    },

    init () {
      this.createThrottleMethods()
      this.scrollEl = this.$el.querySelector('.scroll-container')
      this.bindEvents()
    }
  },
  mounted () {
    this.init()
  },
  beforeDestroy () {
    this.scrollEl.removeEventListener('touchstart', this.handleTouchStart)
    this.scrollEl.removeEventListener('touchend', this.handleTouchEnd)
    this.scrollEl.removeEventListener('touchmove', this.handleTouchMove, { passive: false })
    this.scrollEl.removeEventListener('scroll', this.handleScroll)
  }
}
</script>

<style scoped>
  .vue-pull-to-wrapper {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .scroll-container {
    flex: 1;
    overflow-x: hidden;
    -webkit-overflow-scrolling: touch;
  }

  .vue-pull-to-wrapper .action-block {
    position: relative;
    overflow: hidden;
    height: 0;
    width: 100%;
    line-height: 50px;
  }

  .icon-arrow {
    transition: .2s;
    transform: rotate(180deg);
  }
</style>
