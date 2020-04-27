<template>
  <div id="static">
    <h1>个人中心</h1>
    <div class="content">
      <el-form label-width="100px">
        <el-form-item label="用户ID：" prop="userId">
          <span>{{role.id}}</span>
        </el-form-item>
        <el-form-item label="用户名：" prop="userName">
          <span>{{role.userName}}</span>
        </el-form-item>
        <el-form-item label="姓名：" prop="name">
          <span>{{role.name}}</span>
        </el-form-item>
        <el-form-item label="邮箱：" prop="email">
          <a @click="handlePrecisionChange(role.email)">
            {{role.email}}
            <el-button size="small" type="primary">修改邮箱</el-button>
          </a>
        </el-form-item>
        <el-form-item label="角色：" prop="role">
          <span>{{role.role}}</span>
        </el-form-item>
        <el-form-item label="密码：" prop="email">
            ********
            <update-password @refresh="reload"></update-password>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script lang="typescript">
import Axios from "axios";
import Cookies from "js-cookie";
import updatePassword from './components/update/index.vue'

export default {
  name: "static",
  inject: ["reload"],
  data() {
    return {
      center: {}
    };
  },
  computed: {
    role() {
      return Cookies.get("token")&&JSON.parse(Cookies.get("token"))||{};
    }
  },
  methods: {
    handlePrecisionChange(pair) {
      this.$prompt("修改邮箱", "提示", {
        inputValidator: value => {
          return !value || !value.trim() ? "邮箱" : true;
        },
        inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/
      }).then(({ value }) => {
        Axios.post("/api/user/update", {
          id: this.role.id,
          email: value,
          userName: this.role.userName
        }).then(res => {
          this.$message({
            message: "修改成功！",
            type: "success"
          });
          Cookies.set("token", res.data.data);
          this.reload();
        });
      });
    }
    // toBack(id) {
    //   this.$confirm("确定要撤销此申请吗？", "提示", {
    //     type: "warning"
    //   }).then(() => {
    //     Axios.post("/api/borrow/cancel", { id: id }).then(res => {
    //       this.$message({
    //         message: "撤销成功！",
    //         type: "success"
    //       });
    //       this.search({ page: 1 });
    //     });
    //   });
    // }
  },
  mounted() {
    console.log(JSON.parse(Cookies.get("token")));
  },
  components: {
      updatePassword
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
      padding:12px 0;
    background-color: #fff;
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