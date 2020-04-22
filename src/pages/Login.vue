<template>
  <div id="login">
    <div class="login-circle">
      <el-card>
        <el-form :model="form" label-width="80px" ref="loginForm" @submit.native.prevent="onSubmit">
          <el-form-item
            label="账号："
            :rules="{
            required: true,
            message: '请输入账号'
          }"
          >
            <el-input v-model="form.username"></el-input>
          </el-form-item>
          <el-form-item
            label="密码："
            :rules="{
            required: true,
            message: '请输入密码'
          }"
          >
            <el-input type="password" v-model="form.password"></el-input>
          </el-form-item>

          <el-form-item class="actions">
            <el-button type="primary" native-type="submit" class="login-btn"  :loading="!allowSub">登录</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
  </div>
</template>

<script lang="typescript">
import Axios from "axios";
import Cookies from 'js-cookie';
export default {
  name: "login",
  data() {
    return {
      form: {},
      allowSub: true,
      token:''
    };
  },
  methods: {
    onSubmit() {
         this.allowSub = false;
      Axios.post("/api/login", {
        userName: this.form.username,
        password: this.form.password
      }).then(res => {
          this.allowSub = true;
        this.$router.replace('/home');
              this.$message({
                showClose: false,
                message:'登录成功',
                type: 'success'
            });
            Cookies.set('token', res.data.data.token);
      }).catch(res=>{
            this.$message({
                showClose: true,
                message: res.msg,
                type: 'error'
            });
            this.allowSub = true;
      })
    }
  }
};
</script>

<style lang="stylus" scoped>
#login {
  width: 500px;
  margin: 150px auto;
  padding: 98px 20px 88px;
  background-color: #fff;
  box-shadow: 2px 2px 10px #b2baca;

  .login-circle {
    ::v-deep.el-card.is-always-shadow, .el-card.is-hover-shadow:focus, .el-card.is-hover-shadow:hover {
      box-shadow: none;
      border: none;

      .el-form {
        font-size: 16px;

        .el-button--primary {
          width: 100%;
        }
      }
    }
  }
}
</style>