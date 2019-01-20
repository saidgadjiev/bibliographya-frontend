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
      <sidebar @input="applyRoleFilter" :roles="allRoles"></sidebar>
    </template>
    <template slot="smSidebar">
      <side-card @input="applyRoleFilter" :roles="allRoles"></side-card>
    </template>
  </list>
</template>

<script>
import List from '../components/list/List'
import UserCard from '../components/user/UserCard'
import usersService from '../services/users-service'
import rolesService from '../services/roles-service'
import Sidebar from '../components/user/sidebar/Sidebar'
import SideCard from '../components/user/sidebar/SideCard'

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
  components: { SideCard, Sidebar, UserCard, List },
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
