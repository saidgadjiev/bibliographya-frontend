<template>
  <v-layout row wrap class="ma-0 pa-0">
    <v-flex xs12 sm6 md3 class="pl-0">
      <v-text-field
        :readonly="readonly"
        v-model="getLastName"
        label="Фамилия"
        type="text"
      ></v-text-field>
    </v-flex>
    <v-flex xs12 sm6 md3>
      <v-text-field
        :readonly="readonly"
        v-model="getFirstName"
        label="Имя"
        type="text"
      ></v-text-field>
    </v-flex>
    <v-flex xs12 sm6 md3>
      <v-text-field
        :readonly="readonly"
        v-model="getMiddleName"
        label="Отчество"
        type="text"
      ></v-text-field>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: 'EditFio',
  props: {
    lastName: String,
    firstName: String,
    middleName: String,
    readonly: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    getFirstName: {
      get () {
        return this.firstName
      },
      set (val) {
        this.$emit('update:firstName', val)
      }
    },
    getLastName: {
      get () {
        return this.lastName
      },
      set (val) {
        this.$emit('update:lastName', val)
      }
    },
    getMiddleName: {
      get () {
        return this.middleName
      },
      set (val) {
        this.$emit('update:middleName', val)
      }
    }
  }
}
</script>

<style scoped>

</style>
