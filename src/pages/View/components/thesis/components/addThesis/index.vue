<template>
  <div>
    <el-button type="warning" icon="el-icon-plus" @click="dialogVisible = true">添加论文</el-button>
    <el-dialog :visible="dialogVisible" title="添加论文" width="800px" @close="closeDialog">
      <el-form :model="vals" ref="form" :rules="rules" label-width="100px">
        <el-form-item label="论文标题：" prop="thesisTitle">
          <el-input v-model="vals.thesisTitle"></el-input>
        </el-form-item>
        <el-form-item label="作者：">
          <mutiple-input v-model="vals.author" />
        </el-form-item>
        <el-form-item label="关键词：">
          <key-mutiple-input v-model="vals.thesisKeyword" />
        </el-form-item>
        <el-form-item label="pdf：" prop="pdf">
          <upload v-model="vals.pdf"></upload>
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
import Upload from "../../../../../../base/uploadPdf";
import MutipleInput from "../mutipleInput";
import KeyMutipleInput from "../keymutipleInput";

export default {
  name: "addBooks",
  data() {
    return {
      dialogVisible: false,
      vals: {},
      rules: {
        bookName: {
          required: true,
          message: "请填写"
        }
      }
    };
  },
  components: {},
  computed: {},
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
      console.log(this.vals.author);
      var str = [];
      for (var i = 0; i < this.vals.author.length; i++) {
        str.push(this.vals.author[i].key);
      }
      var strKey = [];
      for (var i = 0; i < this.vals.thesisKeyword.length; i++) {
        strKey.push(this.vals.thesisKeyword[i].key);
      }
      Axios.post("/api/thesis/add", {
        ...this.vals,
        author: str,
        thesisKeyword: strKey
      })
        .then(res => {
          this.$message({
            message: "添加成功！",
            type: "success"
          });
          this.dialogVisible = false;
          this.$emit("refresh");
        })
    }
  },
  components: {
    MutipleInput,
    KeyMutipleInput,
    Upload
  }
};
</script>

