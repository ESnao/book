<template>
  <div id="static">
    <div class="header">
      <span @click="toBack()"> &lt; 返回</span>
      <h1>退卡流程</h1>
    </div>

    <div class="content">
        <p>退卡时，图书馆需办理以下事项：</P>
        <p>确认归还所有图书、无欠赔款、罚款等。无问题者系统自动通过，否则到图书馆办理。</P>
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