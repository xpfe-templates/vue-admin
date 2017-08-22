<template>
<el-menu class="navbar" mode="horizontal" theme="dark">
  <a href="javascript:;" class="navbar-logo"></a>
  <slot></slot>
  <el-dropdown class="navbar-right" trigger="click">
    <div class="navbar-right__wrap">
      <slot name="right"></slot>
      <span>{{ username }}</span>
      <i class="iconfont">arrow_drop_down</i>
    </div>
    <el-dropdown-menu class="user-dropdown" slot="dropdown">
      <el-dropdown-item><span @click="logout" style="display:block;">退出登录</span></el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</el-menu>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Navbar',
  computed: {
    ...mapGetters(['username']),
  },
  methods: {
    logout() {
      this.$store.dispatch('LogOut').then(() => {
        location.reload() // 为了重新实例化vue-router对象 避免bug
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.navbar {
  position: fixed;
  z-index: 1002;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  height: 60px;
  line-height: 60px;
  border-radius: 0px !important;
  &-logo {
    float: left;
    width: 120px;
    height: 60px;
    background: url('../../public/img/icon-logo.png') no-repeat;
    background-size: 90px 30px;
    background-position: 15px 15px;
  }
  &-right {
    float: right;
    margin-right: 20px;
    color: #DDDDDD;
    cursor: pointer;
    span {
      margin-right: 4px;
    }
    .iconfont {
      float: right;
      margin-top: 22px;
    }
  }
}
</style>
