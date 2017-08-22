<template>
<el-menu class="sidebar el-menu--gray" mode="vertical" theme="dark" :default-active="$route.path">
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
  border-radius: 0px !important;
  overflow-y: auto;
}
</style>
