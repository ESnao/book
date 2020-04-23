<template>
  <div id="static">
    <h1>图书管理</h1>
    <div class="content">
      <el-form class="page-actions">
        <el-input placeholder="请输入书名" clearable v-model="formData.bookName"></el-input>
        <el-input placeholder="请输入作者" clearable v-model="formData.author"></el-input>
        <el-input placeholder="请输入书籍编号" clearable v-model="formData.bookNumber"></el-input>
        <el-input placeholder="请输入出版社" clearable v-model="formData.press"></el-input>
        <el-select v-model="formData.bookType" placeholder="请选择类别">
          <el-option v-for="(item,index) in typeList" :key="index" :label="item" :value="item"></el-option>
        </el-select>
        <el-select v-model="formData.status" placeholder="请选择状态">
          <el-option label="可借" value="0"></el-option>
          <el-option label="不可借" value="1"></el-option>
        </el-select>
        <el-button type="primary" @click="search({ page: 1 })">搜索</el-button>
        <span v-if="role==='admin'||role==='maneger'" class="mane">
          <add-book @refresh="search"></add-book>
          <add-book-type @refresh="getBookType"></add-book-type>
        </span>
      </el-form>
    </div>
    <el-table :data="bookList">
      <el-table-column prop="author" label="图片">
        <template slot-scope="scope">
          <img :src="scope.row.picture" class="pic" />
        </template>
      </el-table-column>
      <el-table-column label="创建时间">
        <template slot-scope="scope">
          <!-- {{ scope.row.createdTime | moment }} -->
          {{ scope.row.createdTime}}
        </template>
      </el-table-column>
      <el-table-column prop="bookName" label="书名">
        <template slot-scope="scope">《 {{scope.row.bookName}} 》</template>
      </el-table-column>
      <el-table-column prop="author" label="作者"></el-table-column>
      <el-table-column prop="bookType" label="书籍类型"></el-table-column>
      <el-table-column prop="bookNumber" label="书籍编号"></el-table-column>
      <el-table-column prop="bookshelf" label="书架"></el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="scope">
          <span v-if="scope.row.status == 0">可借</span>
          <span v-else>不可借</span>
        </template>
      </el-table-column>
      <el-table-column prop="press" label="出版社"></el-table-column>
      <el-table-column label="操作"  width="250">
        <template slot-scope="scope">
          <el-button type="primary" @click="update(scope.row)" size="small" v-show="role==='admin'||role==='maneger'">修改</el-button>
          <el-button type="danger" @click="remove(scope.row.id)" size="small" v-show="role==='admin'||role==='maneger'">删除</el-button>
          <el-button type="primary" @click="review(scope.row)" size="small" >查看详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination
      :size="pagination.size"
      :total="totalCount"
      :page="pagination.page"
      @pageChanged="search"
    ></pagination>
    <div class="update-dialog">
      <el-dialog :visible="editingProject" title="修改内容" width="1000px" @close="closeDialog">
        <el-form :model="updateOne" ref="form" :rules="rules" label-width="150px">
          <el-form-item label="书名：" prop="bookName">
            <el-input v-model="updateOne.bookName"></el-input>
          </el-form-item>
          <el-form-item label="作者：" prop="author">
            <el-input v-model="updateOne.author"></el-input>
          </el-form-item>
          <el-form-item label="所在楼层：" prop="floor">
            <el-input v-model="updateOne.floor"></el-input>
          </el-form-item>
          <el-form-item label="所在书架：" prop="bookshelf">
            <el-input v-model="updateOne.bookshelf"></el-input>
          </el-form-item>
          <el-form-item label="书籍编号：" prop="bookNumber">
            <el-input v-model="updateOne.bookNumber"></el-input>
          </el-form-item>
          <el-form-item label="出版社：" prop="press">
            <el-input v-model="updateOne.press"></el-input>
          </el-form-item>
          <el-form-item label="版本：" prop="edition">
            <el-input v-model="updateOne.edition"></el-input>
          </el-form-item>
          <el-form-item label="简介：" prop="describe">
            <el-input v-model="updateOne.describe"></el-input>
          </el-form-item>
          <el-form-item label="书籍类型：" prop="bookType">
            <el-select v-model="updateOne.bookType">
              <el-option v-for="(item,index) in typeList" :key="index" :label="item" :value="item"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="图片：" prop="picture">
            <upload v-model="updateOne.picture"></upload>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="closeDialog">取消</el-button>
          <el-button type="primary" @click="handleSave()">保存</el-button>
        </span>
      </el-dialog>
    </div>
    <div class="review-dialog">
      <el-dialog :visible="reviewProject" title="查看书籍详情" width="1000px" @close="closeReviewDialog">
        <el-form :model="reviewOne" ref="form" :rules="rules" label-width="150px">
          <el-form-item label="书名：" prop="bookName">
              <span>{{reviewOne.bookName}}</span>
          </el-form-item>
          <el-form-item label="作者：" prop="author">
                       <span>{{reviewOne.author}}</span>
          </el-form-item>
          <el-form-item label="所在楼层：" prop="floor">
               <span>{{reviewOne.floor}}</span>
          </el-form-item>
          <el-form-item label="所在书架：" prop="bookshelf">
               <span>{{reviewOne.bookshelf}}</span>
          </el-form-item>
          <el-form-item label="书籍编号：" prop="bookNumber">
               <span>{{reviewOne.bookNumber}}</span>
          </el-form-item>
          <el-form-item label="出版社：" prop="press">
               <span>{{reviewOne.press}}</span>
          </el-form-item>
          <el-form-item label="版本：" prop="edition">
               <span>{{reviewOne.author}}</span>
          </el-form-item>
          <el-form-item label="简介：" prop="describe">
               <span>{{reviewOne.describe}}</span>
          </el-form-item>
          <el-form-item label="书籍类型：" prop="bookType">
               <span>{{reviewOne.bookType}}</span>
          </el-form-item>
          <el-form-item label="图片：" prop="picture">
              <img :src="reviewOne.picture">
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="closeReviewDialog">取消</el-button>
            <el-button type="primary" @click="borrow(reviewOne.bookName,reviewOne.bookNumber)" v-if="role!=='guest'">申请借阅</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script lang="typescript">
import Axios from "axios";
import Cookies from "js-cookie";
import Upload from "../../../../base/upload/index.vue";
import Pagination from "../../../../base/pagination/index.vue";
import addBook from "./components/addBook/index.vue";
import addBookType from "./components/addBookType/index.vue";

export default {
  name: "static",
  data() {
    return {
      formData: {
          status:'0'
      },
      typeList: [],
      bookList: [],
      pagination: {
        page: 1,
        size: 10
      },
      totalCount: 0,
      role: JSON.parse(Cookies.get("token")).role,
      editingProject: false,
      reviewProject:false,
      updateOne: {},
      reviewOne:{},
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
  methods: {
    getBookType() {
      Axios.get("/api/guest/bookType/get").then(res => {
        this.typeList = res.data.data;
      });
    },
    search(pages) {
      Axios.get("/api/book/guest/search", {
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
    update(val) {
      this.editingProject = true;
      this.updateOne = {
        ...val
      };
    },
    closeDialog() {
      this.editingProject = false;
    },
    review(val){
        this.reviewProject=true; 
        this.reviewOne=val;
    },
    closeReviewDialog(){
        this.reviewProject=false;
    },
    handleSave() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.doSave();
        }
      });
    },
    doSave() {
      Axios.post("/api/book/update", this.updateOne)
        .then(res => {
          this.$message({
            message: "修改成功！",
            type: "success"
          });
          this.search({ page: 1 });
          this.editingProject = false;
        })
        .catch(res => {
          this.$message({
            message: res.data.msg,
            type: "error"
          });
        });
    },
    remove(id) {
      this.$confirm("确定要删除此条数据吗？", "提示", {
        type: "warning"
      }).then(() => {
        Axios.post("/api/book/update", { status: "-1", id: id })
          .then(res => {
            this.$message({
              message: "删除成功！",
              type: "success"
            });
            this.search({ page: 1 });
          })
          .catch(res => {
            this.$message({
              message: res.data.msg,
              type: "error"
            });
          });
      });
    },
    borrow(name,id){
    Axios.post("/api/borrow/add", { bookName:name,bookNumber:id
      }).then(res => {
          console.log(res.data);
            this.$message({
            message: "申请已提交！",
            type: "success"
          });
          this.reviewProject=false;
      }).catch(res=>{
             this.$message({
            message: res.data.msg,
            type: "error"
          });
      })
    }
  },
  mounted() {
    this.getBookType();
    this.search(this.pagination);
  },
  components: {
    Pagination,
    addBook,
    addBookType,
    Upload
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