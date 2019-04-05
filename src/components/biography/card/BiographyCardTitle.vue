<template>
  <v-card-title>
    <div>
      <biography-card-title-moderation v-if="showModerationBlock" v-bind="$attrs"/>
      <div v-if="showPublish">
        Публикация: <strong>{{ _publishTitle }}</strong>
      </div>
      <div>
        <span v-for="(category, index) in categories" :key="index">
          <router-link class="bib-a" :to="'/categories/' + category.id">{{ category.name }}</router-link>&nbsp;&nbsp;
        </span>
      </div>
      <h4 v-if="_showAuthor">
        Автор:
        <router-link class="bib-a word-break-all" :to="_creatorBiographyLink">{{ _creatorName }}</router-link>
      </h4>
      <div :class="{'pt-3': _showAuthor || showPublish || showModerationBlock}">
        <span :class="_fullNameClasses" class="word-break-word">{{ _fullName }}
          <v-icon v-if="_isMarked" small color="blue darken-3" class="pb-1">mdi-check-decagram</v-icon>
        </span>
      </div>
      <biography-card-menu v-bind="_attrs" v-on="$listeners"/>
    </div>
  </v-card-title>
</template>

<script>
import { PUBLISH_STATUS } from '../../../config'
import BiographyCardMenu from '../card/BiographyCardMenu'
import BiographyCardTitleModeration from '../../moderation/card/BiographyCardTitleModeration'

export default {
  name: 'BiographyCardTitle',
  inheritAttrs: false,
  props: {
    categories: {
      type: Array,
      default: function () {
        return []
      }
    },
    userId: {
      type: Number
    },
    firstName: {
      type: String,
      default: ''
    },
    lastName: {
      type: String,
      default: ''
    },
    publishStatus: {
      type: Number
    },
    middleName: {
      type: String,
      default: ''
    },
    creatorId: {
      type: Number
    },
    creator: {
      type: Object
    },
    showPublish: {
      type: Boolean,
      default: false
    },
    showModerationBlock: {
      type: Boolean,
      default: false
    },
    anonymousCreator: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    _attrs () {
      return Object.assign({},
        this.$attrs,
        {
          categories: this.categories,
          creatorId: this.creatorId,
          creator: this.creator,
          userId: this.userId,
          publishStatus: this.publishStatus,
          firstName: this.firstName,
          lastName: this.lastName,
          middleName: this.middleName,
          anonymousCreator: this.anonymousCreator
        }
      )
    },
    _fullNameClasses () {
      if (this.$vuetify.breakpoint.mdAndUp) {
        return {
          'title': true
        }
      }

      return {
        'subheading': true
      }
    },
    _isMarked () {
      return this.userId
    },
    _fullName () {
      let full = this.lastName + ' ' + this.firstName
      if (this.middleName) {
        return full + ' ' + this.middleName
      }

      return full
    },
    _creatorBiographyLink () {
      if (this.creator) {
        return '/biographies/' + this.creator.id
      }

      return ''
    },
    _creatorName () {
      return this.creator.firstName + ' ' + this.creator.lastName
    },
    _showAuthor () {
      return !this.anonymousCreator
    },
    _publishTitle () {
      return this.publishStatus === PUBLISH_STATUS.PUBLISHED ? 'Опубликовано' : 'Снято с публикации'
    }
  },
  components: {
    BiographyCardTitleModeration,
    BiographyCardMenu
  }
}
</script>

<style scoped>
</style>
