<template>
  <div id="static">
    <div class="header">
      <span @click="toBack()"> &lt; 返回</span>
      <h1>新人专栏</h1>
    </div>

    <div class="content">
    <p>新人朋友们，你们好！</P>
    <p>时间是一把握不住的沙，稍不注意就从指间流逝，在青春这段最美的时光里学会并爱上读书吧。</P>
    <p>图书馆，最是那一缕动人的墨魂，萦绕着清幽的书香,为我们开辟一处心灵小憩的地方。或是邀上三两本好书、或是携上几阙好诗，在时光的罅隙中滋养我们的精神。</P>
    <p>我们图书馆有着丰富的馆藏资源、便捷的设施设备、专业的图书馆员和浓厚的学习氛围……</P>
    <p>朋友们，图书馆准备好了，静待卿至。</P>
    <p>我们会充分利用现代移动图书馆、数字图书馆和智慧图书馆，竭诚为大家提供一个可以徜徉的知识海洋。了解、熟悉、充分利用图书馆，你将深深地为它的魅力所折服。图书馆将成为你成长路上读书思辨之佳航，修身养性之佳所。</P>
    <p>你来或不来，我们就在这里，欢迎着，期待着……</P>
    <p align='right'>——馆长 陈曦</P>
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
    span{
        position: absolute;
        left: 0;
        cursor pointer
    }
    h1{
        text-align: center;
    }
 
  }

  .content {
    background-color: #fff;
    padding:30px 0;
    height 600px;
    p{
        padding:2px 10px;
    }
  }
}
</style>