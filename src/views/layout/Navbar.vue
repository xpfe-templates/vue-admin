<template>
<el-menu class="navbar" mode="horizontal" background-color="#03181A" text-color="#fff" active-text-color="#fff">
  <a href="javascript:;" class="navbar-logo"></a>
  <slot name="left"></slot>
  <div class="navbar-right">
    <error-log v-if="log.length" class="navbar-right__log" :log="log"></error-log>
    <div class="navbar-right__slots"><slot></slot></div>
  </div>
  <el-dropdown class="navbar-user" trigger="click">
    <div class="navbar-user__wrap">
      <span>{{userInfo.email}}</span>
      <i class="iconfont">arrow_drop_down</i>
    </div>
    <el-dropdown-menu class="navbar-user__dropdown" slot="dropdown">
      <el-dropdown-item><span @click="onLogout" style="display:block;">退出登录</span></el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</el-menu>
</template>

<script>
import { mapGetters } from 'vuex'
import errorLog from '@/components/ErrorLog'
import errLogStore from '@/store/errLog'

export default {
  name: 'Navbar',
  components: { errorLog },
  data () {
    return {
      log: errLogStore.state.errLog
    }
  },
  computed: {
    ...mapGetters(['userInfo']),
  },

  methods: {
    onLogout () {
      this.$store.dispatch('LogOut')
      .then(() => {
        this.$router.push({ path: '/login' })
      })
    },
  },

  mounted () {
    this.$store.dispatch('GetUserInfo')
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
  &-logo {
    position: absolute;
    top: 0;
    left: 0;
    width: 120px;
    height: 60px;
    background: url('../../assets/img/icon-logo.png') no-repeat;
    background-size: 90px 30px;
    background-position: 15px 15px;
  }
  &-right {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 150px;
    color: #DDDDDD;
    cursor: pointer;
    &__log, &__slots {
      float: left;
      margin-right: 20px;
    }
  }
  &-user {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 20px;
    color: #DDDDDD;
    cursor: pointer;
    &__wrap {
      img {
        float: left;
        width: 32px;
        height: 32px;
        margin: 14px 4px 0 0;
        border-radius: 50%;
      }
      .iconfont {
        float: right;
        margin-top: 22px;
      }
    }
  }
}
</style>
