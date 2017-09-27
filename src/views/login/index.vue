<template>
<div class="login">
  <h2 class="login-title">奇点云后台管理系统</h2>
  <div class="login-slogon">
    <span>数据智能</span>
    <span>驱动未来</span>
  </div>
  <el-form class="login-form" :model="userInfo" :rules="rules" ref="form" label-position="top">
    <el-form-item label="用户名" prop="userName">
      <el-input v-model="userInfo.userName" placeholder="用户名"></el-input>
    </el-form-item>
    <el-form-item label="登录密码" prop="pwd">
      <el-input v-model="userInfo.pwd" type="password" placeholder="登录密码"></el-input>
    </el-form-item>
    <el-form-item style="margin-bottom: 0;">
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
        userName: '',
        pwd: '',
      },
      rules: {
        userName: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
        ],
        pwd: [
          { required: true, message: '请输入密码', trigger: 'blur' },
        ],
      },
    }
  },

  methods: {
    onSubmit () {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$store.dispatch('Login', this.userInfo)
          .then(res => {
            this.$router.push({ path: '/' })
          })
          .catch(error => {
            this.$message.error(error)
          })
        }
      })
    }
  },
}
</script>

<style lang="scss" scoped>
@import "src/assets/css/mixin.scss";
.login {
  position: relative;
  height: 100%;
  color: #fff;
  background: url('../../assets/img/img-bg-login.jpg') no-repeat;
  background-size: cover;
  &-title {
    padding: 20px 0 0 20px;
    font-size: 16px;
  }
  &-slogon {
    position: absolute;
    top: 300px;
    left: 180px;
    font-size: 24px;
    letter-spacing: 20px;
  }
  &-form {
    box-sizing: border-box;
    position: absolute;
    right: 100px;
    top: 180px;
    width: 360px;
    padding: 32px;
    background: #fff;
    border-radius: 4px;
    &__btn {
      width: 100%;
      margin-top: 32px;
    }
  }
}
</style>
