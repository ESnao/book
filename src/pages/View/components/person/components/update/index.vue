<template>
  <div style="display:inline-block">
    <el-button type="primary" icon="el-icon-edit" @click="dialogVisible = true" size="small">修改登录密码</el-button>
    <el-dialog :visible="dialogVisible" title="修改登录密码" width="500px" @close="closeDialog">
      <el-form label-width="110px" :model="vals" ref="form" :rules="rules">
        <el-form-item label="登录密码：" prop="password">
          <el-input v-model="vals.password" type="password"></el-input>
        </el-form-item>
        <el-form-item label="再次输入：" prop="repassword">
          <el-input v-model="vals.repassword" type="password"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleSaves()">保存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Axios from "axios";
import Cookies from "js-cookie";

export default {
  name: "updatePassword",
  data() {
    return {
      dialogVisible: false,
      vals: {},
      rules: {
        password: {
          required: true,
          message: "请填写"
        },
        repassword: {
          required: true,
          message: "请填写"
        }
      }
    };
  },
  computed: {
    role() {
      return JSON.parse(Cookies.get("token"));
    }
  },
  methods: {
    closeDialog() {
      this.dialogVisible = false;
      this.detail = {};
      this.$refs["form"].resetFields();
    },
    handleSaves() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.vals.password !== this.vals.repassword) {
            this.$message({
              message: "两次密码不一样",
              type: "error"
            });
          } else {
            this.doSave();
          }
        }
      });
    },
    doSave() {
      Axios.post("/api/user/update", {
        id: this.role.id,
        password: this.vals.password,
        userName: this.role.userName
      }).then(res => {
        this.$message({
          message: "修改成功！",
          type: "success"
        });
        Cookies.set("token", res.data.data);
        this.$emit("refresh");
      });
    }
  }
};
</script>

