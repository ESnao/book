<template>
  <div id="static">
    <div class="header">
      <span @click="toBack()">&lt; 返回</span>
      <h1>参考咨询</h1>
    </div>

    <div class="content">
        <div class="node_counter">访问人次:3412</div>
        <div class="content">
          <div class="field-item">
            <span style="margin-left:30px;">常见问题中对我馆资源与服务中常见的问题进行了解答。若仍不能找到答案，可任选以下方式提出问题：</span>
            <table align="left" border="1" cellpadding="1" cellspacing="0" style="width:80%;margin:20px 10% 0 10%;">
              <tbody>
                <tr>
                  <td>电子邮件</td>
                  <td>
                    陈老师：
                    <a href="mailto:247210380@qq.com">247210380@qq.com</a>
                  </td>
                </tr>
                <tr>
                  <td>实时咨询</td>
                  <td>
                    采用在线方式与图书馆员实时对话
                    <br />QQ在线咨询：
                    <br />陈老师：247210380
                    <br />( 服务时间：周一至周五 8:00-11:30；14:00-17:30)
                  </td>
                </tr>
                <tr>
                  <td>QQ群咨询</td>
                  <td>
                    <p>采用在线方式解答咨询，发布图书馆资源、培训等信息。</p>
                    <p>QQ群：247210380</p>
                    <p>&nbsp;</p>
                  </td>
                </tr>
                <tr>
                  <td>电话咨询</td>
                  <td>信息咨询部：17738723912</td>
                </tr>
                <tr>
                  <td>当面咨询</td>
                  <td>
                    &nbsp;地点：图书馆一楼信息咨询办公室
                    <br />（服务时间：周一至周五 8:00-11:30；14:00-17:30) &nbsp;
                  </td>
                </tr>
              </tbody>
            </table>
        </div>
      </div>
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
    padding: 10px 0;

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
    padding: 30px 0;
    height: 600px;

    .node_counter{
      padding-left:30px;
    }

    td {
      padding: 3px 5px;
    }
  }
}
</style>