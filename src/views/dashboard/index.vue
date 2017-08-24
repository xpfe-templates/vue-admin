<template>
<div class="dashboard">
  <div class="dashboard-user">
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

  mounted () {
    console.log(this.a.b)
  }
}
</script>


<style lang="scss" scoped>
.dashboard {
  margin: 20px;
}
</style>
