<template>
  <v-card :flat="flat"  width="100%">
    <slot name="alert"></slot>
    <div v-if="showStatus">
      <v-card-title>
        <strong>{{ moderationStatus }}</strong>
      </v-card-title>
      <v-divider class="m-0"></v-divider>
    </div>
    <v-card-title class="pb-0">
      <span v-for="(category, index) in inBiography.categories" :key="index">
      <a :href="'#/category/' + category">{{ category }}</a>&nbsp;&nbsp;
      </span>
    </v-card-title>
    <v-card-title>
        <span :class="fioClasses">
          {{inBiography.lastName + ' ' + inBiography.firstName + ' ' + inBiography.middleName}}
        </span>
      <v-spacer></v-spacer>
      <v-menu bottom left v-if="showMenu">
        <v-btn
          slot="activator"
          icon
        >
          <v-icon>fas fa-caret-down</v-icon>
        </v-btn>
        <v-list>
          <v-list-tile
            @click="$router.push('/edit/biography/' + inBiography.id)"
          >
            <v-list-tile-title>Редактировать</v-list-tile-title>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-title>Предложить исправление</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
    </v-card-title>
    <v-divider class="m-0"></v-divider>
    <v-card-text>
      <span :class="biographyTitleClasses">Биография:</span>
      <tree-view
        v-if="tree"
        :items="tree"
        v-bind="$attrs"
      ></tree-view>
      <p class="m-0" :class="biographyClasses" v-html="biography"></p>
      <template v-if="biographyClamp">
        <a :href="'#/category/' + categoryName + '/biography/' + inBiography.id" class="font-weight-black">Читать дальше</a>
      </template>
    </v-card-text>
    <slot v-if="showActions" name="actions">
      <v-divider class="m-0"></v-divider>
      <v-card-actions>
      <like
        @like-toggled="onLikeToggled"
        :biography="inBiography" class="ml-1"></like>
      <a :href="'#/biography/' + inBiography.id + '#comments'" class="ml-2" style="text-decoration: none">
        <v-icon color="blue darken-1">mdi-comment-outline</v-icon>
        <span style="font-size: 18px">{{ inBiography.commentsCount }}</span>
      </a>
      <v-spacer></v-spacer>
      <v-icon color="blue darken-1" style="font-size:14px">fas fa-eye</v-icon>
      <span class="ml-1">0</span>
    </v-card-actions>
    </slot>
    <template v-if="showComments">
      <v-divider class="m-0"></v-divider>
      <comments
        id="comments"
        :biography-id="inBiography.id"
        @comment-deleted="$emit('update:commentsCount', inBiography.commentsCount - 1)"
        @comment-added="$emit('update:commentsCount', inBiography.commentsCount + 1)"
      ></comments>
    </template>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex'
import TreeView from '../tree/TreeView.vue'
import Like from '../Like.vue'
import Comments from '../comment/Comments'

const marked = require('marked')
const htmlTruncate = require('html-truncate')

export default {
  name: 'biography-card',
  data () {
    return {
      treeClamped: true,
      tree: undefined
    }
  },
  props: {
    categoryName: {
      type: String
    },
    inBiography: {
      required: true,
      type: Object
    },
    type: {
      type: String,
      default: 'default'
    },
    showComments: {
      type: Boolean,
      default: false
    },
    showActions: {
      type: Boolean,
      default: false
    },
    showMenu: {
      type: Boolean,
      default: false
    },
    showStatus: {
      type: Boolean,
      default: false
    },
    biographyClamp: {
      type: Boolean,
      default: false
    },
    biographyClampSize: Number,
    flat: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapGetters([
      'isAuthorized',
      'getUsername'
    ]),
    moderationStatus () {
      let status = this.inBiography.moderationStatus

      if (status !== undefined) {
        switch (status) {
          case 0:
            return 'На модерации'
          case 1:
            return 'Одобрено'
          case 2:
            return 'Отклонено'
        }
      }

      return ''
    },
    fioClasses () {
      return this.type === 'small' ? 'body-2' : 'headline'
    },
    biographyTitleClasses () {
      return this.type === 'small' ? 'body-1' : 'subheading'
    },
    biographyClasses () {
      return this.type === 'small' ? 'caption' : 'subheading'
    },
    biography () {
      let biography = this.inBiography.biography

      let renderer = new marked.Renderer()

      let that = this
      let stack = []

      that.tree = []
      let i = 0

      renderer.heading = function (text, level, raw) {
        let nextId = '_' + i++
        let node = {
          id: nextId,
          level: level,
          name: text,
          children: []
        }

        if (level === 1) {
          that.tree.push(node)
          stack.push(node)
        } else {
          let peek = stack[stack.length - 1]

          while (peek.level >= level) {
            stack.pop()
            peek = stack[stack.length - 1]
          }

          peek.children.push(node)
          stack.push(node)
        }

        return '<h' + level + ' id="' + nextId + '">' + text + '</h' + level + '>\n'
      }

      let result = marked(biography, {
        renderer: renderer,
        gfm: true,
        tables: true,
        breaks: true,
        pedantic: false,
        sanitize: true,
        smartLists: true,
        smartypants: false
      })

      if (this.biographyClamp) {
        return htmlTruncate(result, this.biographyClampSize, undefined)
      }

      return result
    }
  },
  methods: {
    onLikeToggled () {
      this.$emit('update:likesCount', this.inBiography.likesCount + (this.inBiography.liked ? -1 : 1))
      this.$emit('update:liked', !this.inBiography.liked)
    }
  },
  mounted () {
    if (this.$route.hash) {
      this.$vuetify.goTo(this.$route.hash, {
        duration: 300,
        offset: 0,
        easing: 'easeInOutCubic'
      })
    }
  },
  components: {
    TreeView,
    Like,
    Comments
  }
}
</script>

<style scoped>
  @import "../../../static/bibliography.css";
</style>
