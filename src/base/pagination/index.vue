<template>
  <el-pagination
    class="pagination"
    :background="true"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :current-page="page"
    :page-sizes="[10, 25, 50, 100, 1000]"
    :page-size="size"
    :layout="layout || 'total, prev, pager, next, sizes, jumper'"
    :total="total"
  >
  </el-pagination>
</template>

<script>
export default {
  name: 'Pagination',
  props: ['total', 'size', 'page', 'layout'],
  methods: {
    handleCurrentChange(page) {
      this.$emit('pageChanged', {
        page,
        size: this.size
      });
    },
    handleSizeChange(size) {
      this.$emit('pageChanged', {
        page: this.page,
        size
      });
    }
  }
};
</script>

<style lang="stylus">
.pagination {
  padding-bottom: 0;
  padding-top: 20px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  .el-pagination__total {
    flex: 1;
    display: block;
    text-align: left;
  }
  * {
    font-weight: normal;
  }
}
</style>
