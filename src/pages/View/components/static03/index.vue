<template>
  <div id="static">
    <div class="header">
      <span @click="toBack()">&lt; 返回</span>
      <h1>开馆时间</h1>
    </div>

    <div class="content">
      <table
        border="1"
        cellpadding="4"
        cellspacing="0"
        style="height:270px; width:100%; "
      >
        <tbody>
          <tr>
            <td>
              <div>楼层</div>
            </td>
            <td>
              <div>库（室）名</div>
            </td>
            <td>
              <div>阅览方式</div>
            </td>
            <td>收藏范围</td>
            <td>开放时间（周一至周日）</td>
          </tr>
          <tr>
            <td>一楼</td>
            <td>
              <div>流通服务台</div>
            </td>
            <td>
              <div>&nbsp;</div>
            </td>
            <td>&nbsp;</td>
            <td>
              <p>8：30-17：30（白班）</p>
              <p>17：30-22：00</p>
            </td>
          </tr>
          <tr>
            <td>二~四楼</td>
            <td>
              <div>书库、自修室</div>
            </td>
            <td>
              <div>开架</div>
            </td>
            <td>馆藏中文图书</td>
            <td>8：00-22：00</td>
          </tr>
          <tr>
            <td>五楼</td>
            <td>期刊阅览室&nbsp;</td>
            <td>开架&nbsp;</td>
            <td>
              外文图书、中外文现刊
              <br />中外文过刊、中外文报纸
            </td>
            <td>
              8：30-11：30
              <br />13：00-17：00
            </td>
          </tr>
          <tr>
            <td>六楼</td>
            <td>
              <div>古籍阅览室</div>
            </td>
            <td>
              <div>闭架</div>
            </td>
            <td>古籍图书</td>
            <td>
              周一至周五
              <br />8：30-11：30
              <br />13：00-17：00
            </td>
          </tr>
          <tr>
            <td>七楼</td>
            <td>综合阅览室（一）&nbsp;</td>
            <td>开架&nbsp;</td>
            <td>中文图书基藏库</td>
            <td>
              周一至周五
              <br />8：30-11：30
              <br />13：00-17：00
            </td>
          </tr>
          <tr>
            <td>八楼</td>
            <td>综合阅览室（二）&nbsp;</td>
            <td>开架</td>
            <td>中文图书基藏库</td>
            <td>
              周一至周五
              <br />8：30-11：30
              <br />13：00-17：00
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="typescript">
export default {
  name: "static",
  data() {
    return {
      content: ""
    };
  },
  methods: {
    toBack() {
      this.$router.replace("/");
    }
  }
};
</script>

<style lang="stylus" scoped>
#static {
  padding: 0 10px 10px;
  box-shadow: 2px 2px 10px #b2baca;

  .header {
    line-height: 50px;
    position: relative;
     padding:10px 0;
    span {
      position: absolute;
      left: 0;
      cursor: pointer;
    }

    h1 {
      text-align: center;
    }
  }

  .content {
    background-color: #fff;
    padding: 50px 0;
    text-align: center;
    heigth:600px;
  }
}
</style>