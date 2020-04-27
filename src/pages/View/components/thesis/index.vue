<template>
  <div id="thesis">
    <h1>论文管理</h1>
    <div class="content">
      <el-form class="page-actions">
        <el-input placeholder="请输入论文标题" clearable v-model="formData.thesisTitle"></el-input>
        <el-input placeholder="请输入作者" clearable v-model="formData.author"></el-input>
        <el-input placeholder="请输入关键词" clearable v-model="formData.thesisKeyword"></el-input>
        <el-button type="primary" @click="search({ page: 1 })">搜索</el-button>
        <add-thesis @refresh="search" v-show="role==='admin'||role==='bookManger'"></add-thesis>
      </el-form>
    </div>
    <el-table :data="bookList">
      <el-table-column prop="thesisTitle" label="论文标题"></el-table-column>
      <el-table-column prop="author" label="作者">
        <template slot-scope="scope">
          <span v-for="item in scope.row.author" :key="item" class="closeLast">
            {{item}}
            <span>;</span>
          </span>
        </template>
      </el-table-column>
      <el-table-column prop="author" label="关键词">
        <template slot-scope="scope">
          <span v-for="item in scope.row.thesisKeyword" :key="item" class="closeLast">
            {{item}}
            <span>;</span>
          </span>
        </template>
      </el-table-column>
      <el-table-column prop="pdf" label="内容">
        <template slot-scope="scope">
          <a :href="scope.row.pdf" target="_blank">查看内容</a>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button
            type="danger"
            @click="remove(scope.row.id)"
            size="small"
            v-show="role==='admin'||role==='bookManger'"
          >删除</el-button>
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
import Upload from "../../../../base/upload/index.vue";
import Pagination from "../../../../base/pagination/index.vue";
import addThesis from "./components/addThesis/index.vue"

export default {
  name: "thesis",
  data() {
    return {
      formData: {},
      bookList: [],
      pagination: {
        page: 1,
        size: 10
      },
      totalCount: 0,
      role: Cookies.get("token")&&JSON.parse(Cookies.get("token")).role
    };
  },
  methods: {
    search(pages) {
      Axios.get("/api/thesis/guest/search", {
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
    remove(rowId){
      Axios.post("/api/thesis/delete", {id:rowId}).then(res => {
            this.$message({
            message: "删除成功！",
            type: "success"
          });
          this.search(this.pagination);
      });
    }
  },
  mounted() {
    this.search(this.pagination);
  },
  components: {
    Pagination,
    addThesis
  }
};
</script>

<style lang="stylus" scoped>
#thesis {
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

  .closeLast:last-child {
    span {
      display: none;
    }
  }
}
</style>