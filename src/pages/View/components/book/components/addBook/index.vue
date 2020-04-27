<template>
  <div>
    <el-button type="warning" icon="el-icon-plus" @click="dialogVisible = true">添加图书</el-button>
    <el-dialog
      :visible="dialogVisible"
      title="添加图书"
      width="800px"
      @close="closeDialog"
      @open="getbookType"
    >
      <el-form :model="vals" ref="form" :rules="rules" label-width="100px">
        <el-form-item label="书名：" prop="bookName">
          <el-input v-model="vals.bookName"></el-input>
        </el-form-item>
        <el-form-item label="作者：" prop="author">
          <el-input v-model="vals.author"></el-input>
        </el-form-item>
        <el-form-item label="所在楼层：" prop="floor">
          <el-input v-model="vals.floor"></el-input>
        </el-form-item>
        <el-form-item label="所在书架：" prop="bookshelf">
          <el-input v-model="vals.bookshelf"></el-input>
        </el-form-item>
        <el-form-item label="书籍编号：" prop="bookNumber">
          <el-input v-model="vals.bookNumber"></el-input>
        </el-form-item>
        <el-form-item label="出版社：" prop="press">
          <el-input v-model="vals.press"></el-input>
        </el-form-item>
        <el-form-item label="版本：" prop="edition">
          <el-input v-model="vals.edition"></el-input>
        </el-form-item>
        <el-form-item label="简介：" prop="describe">
          <el-input v-model="vals.describe"></el-input>
        </el-form-item>
        <el-form-item label="书籍类型：" prop="bookType">
          <el-select v-model="vals.bookType">
            <el-option v-for="(item,index) in typeList" :key="index" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="图片：" prop="picture">
          <upload v-model="vals.picture"></upload>
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
import Upload from "../../../../../../base/upload/index.vue";

export default {
  name: "addBooks",
  data() {
    return {
      dialogVisible: false,
      vals: {},
      typeList: [],
      rules: {
        bookName: {
          required: true,
          message: "请填写"
        },
        author: {
          required: true,
          message: "请填写"
        },
        floor: {
          required: true,
          message: "请填写"
        },
        bookshelf: {
          required: true,
          message: "请填写"
        },
        bookNumber: {
          required: true,
          message: "请填写"
        },
        press: {
          required: true,
          message: "请填写"
        },
        edition: {
          required: true,
          message: "请填写"
        },
        describe: {
          required: true,
          message: "请填写"
        },
        bookType: {
          required: true,
          message: "请填写"
        },
        picture: {
          required: true,
          message: "请填写"
        }
      }
    };
  },
  components: {},
  computed: {},
  methods: {
    getbookType() {
      Axios.get("/api/guest/bookType/get").then(res => {
        this.typeList = res.data.data;
      });
    },
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
      Axios.post("/api/book/add", this.vals)
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
    Upload
  }
};
</script>

