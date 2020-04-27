<template>
  <div id="static">
    <div class="header">
      <span @click="toBack()"> &lt; 返回</span>
      <h1>本馆概况</h1>
    </div>

    <div class="content">
        <p>本馆暂未上线，敬请期待...</P>
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
    padding:10px 0;
    position: relative;
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
    padding:50px 0;
    height 600px;
    text-align :center;
  }
}
</style>