<template>
<div class="login">
  <form class="login-form">
    <li class="login-form__item">
      <span>用户名</span>
      <input type="text" v-model="userInfo.username">
    </li>
    <li class="login-form__item">
      <span>密码</span>
      <input type="password" v-model="userInfo.password">
    </li>
    <li class="login-form__btn" @click="onSubmit">登录</li>
  </form>
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
      // if (!this.userInfo.password) {
      //   console.log('please input password')
      //   return
      // }
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
@import "src/public/css/mixin.scss";
.login {
  height: 100vh;
  background-color: #2d3a4b;
  &-form {
    width: 300px;
    height: 300px;
    margin: 0 auto;
    padding-top: 200px;
    &__item {
      @include clearfix;
      margin-top: 10px;
      color: #fff;
      span {
        float: left;
        width: 100px;
        line-height: 30px;
        text-align: right;
      }
      input {
        float: left;
        width: 190px;
        height: 30px;
        line-height: 30px;
        margin-left: 10px;
      }
    }
    &__btn {
      display: inline-block;
      margin: 30px 0 0 110px;
      width: 150px;
      line-height: 40px;
      color: #fff;
      text-align: center;
      background: #20a0ff;
      cursor: pointer;
    }
  }
}
</style>
