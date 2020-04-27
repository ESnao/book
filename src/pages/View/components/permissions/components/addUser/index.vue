<template>
  <div style="display:inline-block">
    <el-button type="warning" icon="el-icon-edit" @click="dialogVisible = true">添加新用户</el-button>
    <el-dialog :visible="dialogVisible" title="添加新用户" width="500px" @close="closeDialog">
      <el-form label-width="110px" :model="vals" ref="form" :rules="rules">
        <el-form-item label="用户名：" prop="userName">
          <el-input v-model="vals.userName"></el-input>
          <span>用户名应为非中文的5-10位哦</span>
        </el-form-item>
        <el-form-item label="姓名：" prop="name">
          <el-input v-model="vals.name"></el-input>
        </el-form-item>
        <el-form-item label="邮箱：" prop="email">
          <el-input v-model="vals.email"></el-input>
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
        userName: {
          required: true,
          message: "请填写"
        },
        name: {
          required: true,
          message: "请填写"
        },
        email: [
          {
            required: true,
            message: "请填写"
          },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
          }
        ]
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
            this.doSave();
        }
      });
    },
    doSave() {
      Axios.post("/api/user/add",this.vals).then(res => {
        this.$message({
          message: "添加成功！",
          type: "success"
        });
        Cookies.set("token", res.data.data);
         this.dialogVisible = false;
        this.$emit("refresh");
      });
    }
  }
};
</script>

