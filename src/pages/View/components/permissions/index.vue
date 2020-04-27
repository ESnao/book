<template>
  <div id="static">
    <h1>权限管理</h1>
    <div class="content">
      <el-form class="page-actions">
        <el-input placeholder="请输入用户姓名" clearable v-model="formData.userName"></el-input>
        <el-select v-model="formData.rid" placeholder="请选择角色">
          <el-option label="管理员" value="bookManger"></el-option>
          <el-option label="普通用户" value="student"></el-option>
        </el-select>
        <el-button type="primary" @click="search()">搜索</el-button>
        <add-user @refresh="serch()"></add-user>
      </el-form>
    </div>
    <el-table :data="userList">
      <el-table-column prop="id" label="用户ID"></el-table-column>
      <el-table-column prop="userName" label="用户名"></el-table-column>
      <el-table-column prop="name" label="姓名"></el-table-column>
      <el-table-column prop="email" label="邮箱"></el-table-column>
      <el-table-column prop="role" label="角色">
        <template slot-scope="scope">
          <span v-if="scope.row.role==='admin'">馆长</span>
          <span v-else-if="scope.row.role==='bookManger'">管理员</span>
          <span v-else>普通用户</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200" v-show="role==='admin'">
        <template slot-scope="scope">
          <el-button type="danger" @click="update(scope.row.id)" size="small">修改角色</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="update-dialog">
      <el-dialog :visible="reviewProject" title="修改角色" width="500px" @close="closeReviewDialog">
        <el-form label-width="100px">
          <el-form-item label="角色：" prop="rid">
            <el-select v-model="rid" placeholder="请选择角色">
              <el-option label="管理员" value="2"></el-option>
              <el-option label="普通用户" value="3"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="closeReviewDialog">取消</el-button>
          <el-button type="primary" @click="borrow()" v-if="role!=='guest'">确定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script lang="typescript">
import Axios from "axios";
import qs from "qs";
import Cookies from "js-cookie";
import addUser from "./components/addUser/index.vue";

export default {
  name: "static",
  data() {
    return {
      formData: {},
      userList: [],
      reviewProject: false,
      role: JSON.parse(Cookies.get("token")).role,
      rid: "",
      uid: ""
    };
  },
  methods: {
    search() {
      Axios.get("/api/user/getAll", {
        params: {
          userName: this.formData.userName,
          role: this.formData.rid
        }
      }).then(res => {
        this.userList = res.data.data.content;
      });
    },
    update(id) {
      this.reviewProject = true;
      this.uid = id;
    },
    closeReviewDialog() {
      this.reviewProject = false;
    },
    borrow() {
      Axios.post(
        "/api/user/updaterole",
        qs.stringify({
          uid: this.uid,
          rid: this.rid
        })
      ).then(res => {
            this.$message({
            message: "修改成功！",
            type: "success"
          });
          this.closeReviewDialog();
        this.search();
      });
    }
  },
  mounted() {
    this.search();
  },
  components: {
    addUser
  }
};
</script>

<style lang="stylus" scoped>
#static {
  padding: 10px;
  box-shadow: 2px 2px 10px #b2baca;

  h1 {
    text-align: center;
    padding-bottom: 10px;
  }

  .content {
    background-color: #fff;

    .page-actions {
      display: flex;
      align-items: center;
      padding: 20px 5px;
      flex-wrap: wrap;

      > .el-input {
        width: auto;
        min-width: 300px;
      }

      > * {
        margin-bottom: 10px;
        margin-right: 10px;
      }
    }
  }

  .pic {
    max-height: 100px;
    max-width: 100px;
  }

  .mane {
    display: flex;
  }
}
</style>