<template>
<div class="dashboard">
  <div class="dashboard-user" style="height: 800px;" >
    <p>
      <span>{{ username }}</span>
      <span v-for="(role, index) in roles" :key="index">{{ role }}</span>
    </p>
  </div>
</div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'dashboard',
  computed: {
    ...mapGetters([
      'username',
      'roles'
    ])
  },

  methods: {
    onLogout () {
      this.$store.dispatch('LogOut').then(() => {
        location.reload() // 为了重新实例化vue-router对象 避免bug
      })
    },
  },
}
</script>


<style lang="scss" scoped>
.dashboard {
  // border: 1px solid red;
}
</style>
