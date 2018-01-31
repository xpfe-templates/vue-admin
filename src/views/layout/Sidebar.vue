<template>
<el-menu class="sidebar" mode="vertical" :default-active="calcActive($route)">
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

  methods: {
    calcActive (route) {
      if (route.meta && route.meta.parent) return route.meta.parent
      return route.path
    },
  },
}
</script>

<style lang="less">
.el-menu {
  background: #052326;
  &-item {
    color: #fff;
    &:hover {
      color: #fff;
      background: #1CCADA;
    }
    i {
      color: #fff;
    }
    &.is-active {
      color: #fff;
      background: #1CCADA;
    }
  }
  &--horizontal {
    border-bottom: none;
  }
}
.el-submenu {
  &__title {
    color: #fff;
    &:hover {
      color: #fff;
      background: #1CCADA;
    }
    i {
      color: #fff;
    }
  }
}
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
