<template>
  <list
    :infinite-load="infiniteLoad"
    :infinite-id.sync="infiniteId"
    :reset-id="resetId"
  >
    <template slot="item" slot-scope="{ item }">
      <user-card
        v-bind.sync="item"
        :all-roles="_roles"
      ></user-card>
    </template>
    <template slot="sidebar">
      <v-combobox
        :loading="loading"
        :items="allRoles"
        label="Выберите роль"
        @input="applyRoleFilter"
        solo
      ></v-combobox>
    </template>
  </list>
</template>

<script>
import List from '../components/list/List'
import UserCard from '../components/user/UserCard'
import usersService from '../services/users-service'
import rolesService from '../services/roles-service'

export default {
  name: 'UsersList',
  data () {
    return {
      loading: true,
      allRoles: [],
      infiniteId: +new Date(),
      resetId: +new Date(),
      roleFilter: undefined
    }
  },
  components: { UserCard, List },
  methods: {
    applyRoleFilter (role) {
      if (role) {
        this.roleQuery = 'roleQuery=role_name==' + role
      } else {
        this.roleQuery = undefined
      }

      ++this.resetId
    },
    infiniteLoad (limit, offset) {
      return usersService.getUsers(limit, offset, this.roleQuery)
    }
  },
  asyncComputed: {
    _roles () {
      let that = this

      return new Promise((resolve) => {
        rolesService.getRoles()
          .then(
            response => {
              that.loading = false
              that.allRoles.push(...response.data)

              resolve(response.data)
            }
          )
      })
    }
  }
}
</script>

<style scoped>

</style>
