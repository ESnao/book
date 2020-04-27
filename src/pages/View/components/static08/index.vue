<template>
  <div id="static">
    <div class="header">
      <span @click="toBack()"> &lt; 返回</span>
      <h1>常见问题</h1>
    </div>

    <div class="content">
        <p> 问：教职工如何办理借阅证或一卡通?</P>
        <p> 答： 在编教职工凭人事处提供的名册，由图书馆开通校园卡的借阅功能，校内各单位自聘人员，凭本人有效证件开通阅览功能，
            借阅功能须由主管单位与图书馆签订承诺书后方可开通。</P>

        <p style="padding-top:5px"> 问：继续教育学院学生如何办理借阅证？</P>
        <p> 答： 持本人有效证件免费开通阅览功能。持本人身份证、学生证学院证明，交纳押金后开通借阅功能。</P>

        <p  style="padding-top:5px"> 问：借阅证丢了怎么办？</P>
        <p> 答：借阅证遗失、解挂、补办等手续均在图书馆书库一楼流通台办理。</P>
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
        toBack(){
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
    padding: 30px 0;
    height:600px;

    p {
      padding: 2px 10px;
    }
  }
}
</style>