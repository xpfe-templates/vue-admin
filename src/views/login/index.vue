<template>
<div class="login">
  <h2>系统登录</h2>
  <el-form class="login-form">
    <el-form-item>
      <el-input v-model="userInfo.username" placeholder="请输入用户名">
        <template slot="prepend">用户名</template>
      </el-input>
    </el-form-item>
    <el-form-item>
      <el-input v-model="userInfo.password" placeholder="请输入密码">
        <template slot="prepend">密码</template>
      </el-input>
    </el-form-item>
    <el-form-item>
      <el-button class="login-form__btn" type="primary" @click="onSubmit">登录</el-button>
    </el-form-item>
  </el-form>
</div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      userInfo: {
        username: 'admin',
        password: ''
      }
    }
  },

  methods: {
    onSubmit () {
      if (!this.userInfo.password) {
        this.$message.warning('密码不能为空！')
        return
      }
      this.$store.dispatch('Login', this.userInfo).then(() => {
        this.$router.push({ path: '/' })
      }).catch(err => {
        console.log(err)
      })
    }
  },
}
</script>

<style lang="scss" scoped>
@import "src/assets/css/mixin.scss";
.login {
  height: 100%;
  background-color: #2d3a4b;
  h2 {
    padding-top: 120px;
    color: #fff;
    text-align: center;
  }
  &-form {
    width: 300px;
    margin: 0 auto;
    margin-top: 50px;
    &__btn {
      width: 100%;
      margin-top: 50px;
    }
  }
}
</style>
