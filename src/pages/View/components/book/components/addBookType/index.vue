<template>
  <div>
    <el-button
      type="info"
      icon="el-icon-plus"
      @click="dialogVisible = true"
      style="margin-left:10px;"
    >添加图书类型</el-button>
    <el-dialog :visible="dialogVisible" title="添加图书类型" width="400px" @close="closeDialog">
      <el-form :model="vals" ref="form" :rules="rules" label-width="100px">
        <el-form-item label="类型名称：" prop="bookType">
          <el-input v-model="vals.bookType"></el-input>
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

export default {
  name: "addBookType",
  data() {
    return {
      dialogVisible: false,
      vals: {},
      rules: {
        bookType: {
          required: true,
          message: "请填写"
        }
      }
    };
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
        console.log(this.vals.bookType)
      Axios.post("/api/bookType/add", {bookType:this.vals.bookType})
        .then(res => {
          this.$message({
            message: "添加成功！",
            type: "success"
          });
          this.dialogVisible = false;
          this.$emit("refresh");
        })
    }
  }
};
</script>

