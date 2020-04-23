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
        <el-button type="primary" @click="search({ page: 1 })">搜索</el-button>
        <el-button type="warning" @click="toAll()">查看所有记录</el-button>
      </el-form>
    </div>
    <el-table :data="bookList">
      <el-table-column prop="userId" label="用户ID"></el-table-column>
      <el-table-column prop="bookName" label="书名">
        <template slot-scope="scope">《 {{scope.row.bookName}} 》</template>
      </el-table-column>
      <el-table-column prop="bookNumber" label="书籍编号"></el-table-column>
      <el-table-column label="借书时间">
        <template slot-scope="scope">{{ scope.row.examineDay}}</template>
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
import Upload from "../../../../base/upload/index.vue";
import Pagination from "../../../../base/pagination/index.vue";

export default {
  name: "static",
  data() {
    return {
      formData: {},
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
        Axios.get("/api/credit/find", {
          params: {
            ...this.formData,
            page: pages.page - 1,
            size: pages.size
          }
        }).then(res => {
          this.bookList = res.data.data.content;
          this.totalCount = res.data.data.totalElements;
        });
    },
       toAll(){
        this.$router.replace("/borrow");
    }

  },
  mounted() {
    this.search(this.pagination);
  },
  components: {
    Pagination,
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