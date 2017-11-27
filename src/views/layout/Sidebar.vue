<template>
<el-menu class="sidebar" mode="vertical" :default-active="$route.path" background-color="#052326" text-color="#fff" active-text-color="#fff">
  <sidebar-item :routes="permissionRouters"></sidebar-item>
</el-menu>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'

export default {
  name: 'Sidebar',
  components: { SidebarItem },
  computed: {
    ...mapGetters(['permissionRouters']),
  },
}
</script>

<style lang="scss" scoped>
.sidebar {
  position: fixed;
  z-index: 1001;
  top: 60px;
  bottom: 0;
  left: 0;
  width: 180px;
  height: 100%;
  overflow-y: auto;
}
</style>
