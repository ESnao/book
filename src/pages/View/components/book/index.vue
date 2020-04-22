<template>
  <div id="static">
    <h1>图书管理</h1>
    <div class="content">
      <el-form class="page-actions">
        <el-input placeholder="请输入书名" clearable v-model="formData.queryValue"></el-input>

        <el-input placeholder="请输入作者" clearable v-model="formData.orderId"></el-input>
        <el-select v-model="formData.pair" placeholder="请选择类别">
          <!-- <el-option
            v-for="item in coinList"
            :key="item"
            :label="item"
            :value="item"
          >
          </el-option>-->
        </el-select>
        <el-select v-model="formData.orderType" placeholder="请选择状态">
          <!-- <el-option
            v-for="item in orderTwo"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>-->
        </el-select>
        <el-input placeholder="请输入出版社" clearable v-model="formData.orderId"></el-input>
        <el-button type="primary" @click="search({ page: 1 })">搜索</el-button>
      </el-form>
    </div>
  </div>
</template>

<script lang="typescript">
export default {
  name: "static",
  data() {
    return {
      formData: {}
    };
  }
};
</script>

<style lang="stylus" scoped>
#static {
  padding: 10px;
  box-shadow: 2px 2px 10px #b2baca;

  h1 {
    text-align: center;
    padding-bottom:10px;  
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
}
</style>