<template>
<div class='sidebarItem-wrap'>
  <template v-for="(item, index) in routes">
    <!-- 只有一层菜单 -->
    <router-link
      v-if="!item.hidden && item.noDropdown && item.children.length > 0" :key="index"
      :to="calcMenuPath(item)"
    >
      <el-menu-item :index="calcMenuPath(item)">
        <i v-if="item.icon" class="iconfont el-menu-iconfont" :class="`icon-${item.icon}`"></i>
        <span slot="title">{{ item.children[0].name }}</span>
      </el-menu-item>
    </router-link>
    <!-- 多层菜单 -->
    <el-submenu :key="index" :index="item.name" v-if="!item.noDropdown && !item.hidden">
      <template slot="title">
        <i v-if="item.icon" class="iconfont el-menu-iconfont" :class="`icon-${item.icon}`"></i>
        <span slot="title">{{ item.name }}</span>
      </template>
      <template v-for="(child, cindex) in item.children" v-if='!child.hidden'>
        <sidebar-item
          v-if="child.children && child.children.length > 0" :key="cindex"
          class='sidebarItem-nested' :routes="[child]"
        ></sidebar-item>
        <router-link v-else :key="cindex" :to="item.path + '/' + child.path">
          <el-menu-item :index="item.path+'/'+child.path">
            <i v-if="child.icon" class="iconfont el-menu-iconfont" :class="`icon-${child.icon}`"></i>
            <span slot="title">{{ child.name }}</span>
          </el-menu-item>
        </router-link>
      </template>
    </el-submenu>
  </template>
</div>
</template>

<script>
export default {
  name: 'SidebarItem',
  props: {
    routes: {
      type: Array,
      default: () => { return [] }
    },
  },

  methods: {
    calcMenuPath (item) {
      if (item.isSlash) {
        return '/' + item.children[0].path
      }
      return item.path + '/' + item.children[0].path
    },
  },
}
</script>
