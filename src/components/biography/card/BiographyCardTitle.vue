<template>
  <v-card-title>
    <div>
      <biography-card-title-moderation v-if="showModerationBlock" v-bind="$attrs"/>
      <div v-if="showPublish">
        Публикация: <strong>{{ _publishTitle }}</strong>
      </div>
      <div v-if="categories && categories.length > 0">
        <span v-for="(category, index) in categories" :key="index">
          <router-link class="bib-a" :to="'/categories/' + category.id">{{ category.name }}</router-link>&nbsp;&nbsp;
        </span>
      </div>
      <small class="d-block" v-if="_showAuthor" style="color: #757575">
        Автор:
        <router-link class="bib-a word-break-word" :to="_creatorAccountLink"><strong>{{ _creatorName }}</strong></router-link>
      </small>
      <small v-if="_isUpdated"  style="color: #757575">
        Создано <strong>{{ format(createdAt) }}</strong>, обновлено <strong>{{ format(updatedAt, true) }}</strong>
      </small>
      <small v-else>
        Создано <strong>{{ format(createdAt) }}</strong>
      </small>
      <div :class="{'pt-3': _showAuthor || showPublish || showModerationBlock}">
        <span :class="_fullNameClasses" class="word-break-word">{{ _fullName }}
          <v-icon v-if="_isMarked" small color="blue darken-3" class="pb-1">mdi-check-decagram</v-icon>
        </span>
      </div>
      <span class="d-block pt-1" v-if="country">
        <span style="color: #78909C">Страна: </span>
        <span>{{ country.name }}</span>
      </span>
      <div v-if="professions && professions.length > 0">
        <span style="color: #78909C">Род деятельности: </span>
        <span v-for="(profession, index) in professions" :key="index">
          <span>{{ profession.name }}</span>&nbsp;&nbsp;
        </span>
      </div>
      <biography-card-menu v-bind="_attrs" v-on="$listeners"/>
    </div>
  </v-card-title>
</template>

<script>
import { PUBLISH_STATUS, DATE_FORMAT } from '../../../config'
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
    },
    createdAt: {
      type: String,
      required: true
    },
    updatedAt: {
      type: String,
      required: true
    },
    country: {
      type: String
    },
    professions: {
      type: Array,
      default: () => []
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
      return {
        'title': true
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
    _creatorAccountLink () {
      if (this.creator) {
        return '/biographies/' + this.creator.userId
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
    },
    _isUpdated () {
      let momentUpdated = this.$moment(this.updatedAt, DATE_FORMAT)
      let momentCreated = this.$moment(this.createdAt, DATE_FORMAT)

      return momentUpdated > momentCreated
    }
  },
  methods: {
    format (time, withTime) {
      if (withTime) {
        return this.$moment(time, DATE_FORMAT).format('DD MMMM YYYY h:mm')
      }

      return this.$moment(time, DATE_FORMAT).format('DD MMMM YYYY')
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
