<template>
  <div id="login">
    <el-card>
      <el-form :model="form" label-width="110px" ref="loginForm" @submit.native.prevent="onSubmit">
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
          <el-button type="primary" native-type="submit" class="login-btn">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script lang="typescript">
export default {
  name: "login",
  data() {
    return {
      form: {},
    };
  },
  methods:{
      onSubmit(){}
  }
};
</script>

<style lang="stylus" scoped>
#static {
  padding: 10px;
  box-shadow: 2px 2px 10px #b2baca;

  h1 {
    text-align: center;
  }

  .content {
    background-color: #fff;
  }
}
</style>