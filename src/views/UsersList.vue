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
      <side-bar @input="applyRoleFilter" :roles="allRoles"></side-bar>
    </template>
    <template slot="smSidebar">
      <side-card @input="applyRoleFilter" :roles="allRoles"></side-card>
    </template>
  </list>
</template>

<script>
import List from '../components/list/List'
import UserCard from '../components/user/card/UserCard'
import usersService from '../services/users-service'
import rolesService from '../services/roles-service'
import SideBar from '../components/user/sidebar/SideBar'
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
  components: { SideCard, SideBar, UserCard, List },
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
  created () {
    let that = this

    rolesService.getRoles()
      .then(
        response => {
          that.loading = false
          that.allRoles.push(...response.data)
        }
      )
  }
}
</script>

<style scoped>

</style>
