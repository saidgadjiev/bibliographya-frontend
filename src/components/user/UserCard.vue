<template>
  <v-card>
    <v-card-title>
      <div>{{ _fullName }}</div>
    </v-card-title>
    <v-card-text>
      Роли:
      <v-chip
        v-for="(role, index) in roles"
        :key="index"
        close
        color="indigo"
        text-color="white"
        @input="deleteRole(role)"
      >
        {{ role }}
      </v-chip>
      <v-btn icon @click="addRole">
        <v-icon small>fas fa-plus</v-icon>
      </v-btn>
      <v-combobox
        v-model="selectedRole"
        :items="availableRoles"
        label="Роли"
      ></v-combobox>
    </v-card-text>
  </v-card>
</template>

<script>
import usersService from '../../services/users-service'

export default {
  name: 'UserCard',
  data () {
    return {
      selectedRole: '',
      availableRoles: []
    }
  },
  props: {
    id: {
      type: Number,
      required: true
    },
    allRoles: {
      type: Array,
      default: function () {
        return []
      }
    },
    roles: {
      type: Array,
      default: function () {
        return []
      }
    },
    biography: {
      type: Object,
      required: true
    }
  },
  created () {
    this.filterRoles()
  },
  methods: {
    filterRoles () {
      let that = this

      this.availableRoles = this.allRoles.filter(function (element) {
        return that.roles.indexOf(element) === -1
      })
    },
    addRole () {
      let that = this

      if (this.selectedRole && this.selectedRole !== '') {
        usersService.addRole(this.id, this.selectedRole)
          .then(
            () => {
              let roles = [...that.roles]

              roles.push(that.selectedRole)
              that.availableRoles.splice(that.availableRoles.indexOf(that.selectedRole), 1)
              that.selectedRole = ''

              that.$emit('update:roles', roles)
            }
          )
      }
    },
    deleteRole (role) {
      let that = this

      usersService.deleteRole(this.id, role)
        .then(
          () => {
            let roles = [...that.roles]

            roles.splice(roles.indexOf(role), 1)
            that.availableRoles.push(role)

            that.$emit('update:roles', roles)
          }
        )
    }
  },
  computed: {
    _fullName () {
      let firstName = this.biography.firstName
      let lastName = this.biography.lastName
      let middleName = this.biography.middleName

      let full = lastName + ' ' + firstName
      if (middleName) {
        return full + ' ' + middleName
      }

      return full
    }
  }
}
</script>

<style scoped>

</style>
