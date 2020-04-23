<template>
  <div id="static">
    <h1>借阅管理</h1>
    <div class="content">
      <el-form class="page-actions">
        <el-input
          placeholder="请输入用户ID"
          clearable
          v-model="formData.author"
          v-show="role==='admin'||role==='maneger'"
        ></el-input>
        <el-input placeholder="请输入书名" clearable v-model="formData.bookName"></el-input>
        <el-input placeholder="请输入书籍编号" clearable v-model="formData.bookNumber"></el-input>
        <el-select v-model="formData.status" placeholder="请选择状态">
          <el-option label="申请中" value="0"></el-option>
          <el-option label="已批准" value="1"></el-option>
          <el-option label="已回绝" value="2"></el-option>
          <el-option label="已归还" value="3"></el-option>
          <el-option label="已撤销" value="4"></el-option>
          <el-option label="等待中" value="-1"></el-option>
          <el-option label="已逾期" value="-2"></el-option>
        </el-select>
        <el-button type="primary" @click="search({ page: 1 })">搜索</el-button>
        <el-button type="info" @click="toOverDue()">查看违约记录</el-button>
      </el-form>
    </div>
    <el-table :data="bookList">
      <el-table-column label="创建时间">
        <template slot-scope="scope">{{ scope.row.applyDay}}</template>
      </el-table-column>
      <el-table-column prop="userId" label="用户ID"></el-table-column>
      <el-table-column prop="bookName" label="书名">
        <template slot-scope="scope">《 {{scope.row.bookName}} 》</template>
      </el-table-column>
      <el-table-column prop="bookNumber" label="书籍编号"></el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="scope">
          <span v-if="scope.row.status == 0">申请中</span>
          <span v-else-if="scope.row.status == 1">已批准</span>
          <span v-else-if="scope.row.status == 2">已回绝</span>
          <span v-else-if="scope.row.status == 3">已归还</span>
          <span v-else-if="scope.row.status == 4">已撤销</span>
          <span v-else-if="scope.row.status == '-1'">等待中</span>
          <span v-else-if="scope.row.status == '-2'">已逾期</span>
        </template>
      </el-table-column>
      <el-table-column label="审核时间">
        <template slot-scope="scope">{{ scope.row.examineDay}}</template>
      </el-table-column>
      <el-table-column label="结束时间">
        <template slot-scope="scope">{{ scope.row.returnDay}}</template>
      </el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button
            type="primary"
            @click="pass(scope.row.id)"
            size="small"
            v-show="(role==='admin'||role==='maneger')&&(scope.row.status==0||scope.row.status=='-1')"
          >批准</el-button>
          <el-button
            type="danger"
            @click="reject(scope.row.id)"
            size="small"
            v-show="(role==='admin'||role==='maneger')&&(scope.row.status==0||scope.row.status=='-1')"
          >回绝</el-button>
          <el-button
            type="danger"
            @click="comeBack(scope.row.id)"
            size="small"
            v-show="(role==='admin'||role==='maneger')&&(scope.row.status==1||scope.row.status=='-2')"
          >确认归还</el-button>
          <el-button
            type="primary"
            @click="toBack(scope.row.id)"
            size="small"
            v-show="role==='student'&&(scope.row.status==0||scope.row.status=='-1')"
          >撤销</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination
      :size="pagination.size"
      :total="totalCount"
      :page="pagination.page"
      @pageChanged="search"
    ></pagination>
  </div>
</template>

<script lang="typescript">
import Axios from "axios";
import Cookies from "js-cookie";
import Pagination from "../../../../base/pagination/index.vue";

export default {
  name: "static",
  data() {
    return {
      formData: {
        status: "0"
      },
      bookList: [],
      pagination: {
        page: 1,
        size: 10
      },
      totalCount: 0,
      role: JSON.parse(Cookies.get("token")).role
    };
  },
  methods: {
    search(pages) {
      if (this.role === "student") {
        Axios.get("/api/borrow/findByToken", {
          params: {
            ...this.formData,
            page: pages.page - 1,
            size: pages.size
          }
        }).then(res => {
          this.bookList = res.data.data.content;
          this.totalCount = res.data.data.totalElements;
        });
      } else {
        Axios.get("/api/borrow/find", {
          params: {
            ...this.formData,
            page: pages.page - 1,
            size: pages.size
          }
        }).then(res => {
          this.bookList = res.data.data.content;
          this.totalCount = res.data.data.totalElements;
        });
      }
    },
    toBack(id) {
      this.$confirm("确定要撤销此申请吗？", "提示", {
        type: "warning"
      }).then(() => {
        Axios.post("/api/borrow/cancel", { id: id }).then(res => {
          this.$message({
            message: "撤销成功！",
            type: "success"
          });
          this.search({ page: 1 });
        });
      });
    },
    toOverDue() {
      this.$router.replace("/overDue");
    },
    pass(id) {
      this.$confirm("确定要通过此申请吗？", "提示", {
        type: "warning"
      }).then(() => {
        Axios.post("/api/borrow/update", { id: id, status: "1" }).then(res => {
          this.$message({
            message: "操作成功！",
            type: "success"
          });
          this.search({ page: 1 });
        });
      });
    },
    reject(id) {
      this.$confirm("确定要回绝此申请吗？", "提示", {
        type: "warning"
      }).then(() => {
        Axios.post("/api/borrow/update", { id: id, status: "2" }).then(res => {
          this.$message({
            message: "操作成功！",
            type: "success"
          });
          this.search({ page: 1 });
        });
      });
    },
    comeBack(id) {
      this.$confirm("确定已将此书归还吗？", "提示", {
        type: "warning"
      }).then(() => {
        Axios.post("/api/borrow/update", { id: id, status: "3" }).then(res => {
          this.$message({
            message: "操作成功！",
            type: "success"
          });
          this.search({ page: 1 });
        });
      });
    }
  },
  mounted() {
    this.search(this.pagination);
  },
  components: {
    Pagination
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