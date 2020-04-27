<template>
  <div id="static">
    <div class="header">
      <span @click="toBack()"> &lt; 返回</span>
      <h1>入馆须知</h1>
    </div>

    <div class="content">
        <p> 1. 凭本人借阅证通过门禁系统依次刷卡入馆，各种证件不得转借。</P>
        <p> 2. 读者入馆应衣着整洁、举止文明，严禁穿拖鞋、背心入馆。</P>
        <p> 3. 保持馆内安静，禁止在馆内喧哗或高声朗读，入馆后请将手机调至震动状态。</P>
        <p> 4. 禁止在书库、阅览室内进餐、吃零食等，食品、饮料不得入内。</P>
        <p> 5. 保持馆内清洁卫生，禁止随地吐痰，乱扔废弃物，禁止在馆内张贴或散发广告及其他宣传品。</P>
        <p> 6. 遵守图书馆规定，不得以任何方式抢占座位，不得随意挪动桌椅。</P>
        <p> 7. 爱护图书与设施设备，严禁随意涂抹刻画和破坏设备，违者将视污损及破坏程度予以处罚。</P>
        <p> 8. 查阅资料每次取图书不得超过3本，用完后放回流转书架，不能将各楼层图书带到其它楼层。</P>
        <p> 9. 上自习的同学请到二楼、四楼、五楼自习室，严禁用图书馆图书占座位，一旦发现，借阅证停用一周。</P>
        <p> 10. 期刊只限五楼期刊阅览室内阅读，一律不允许拿出。</P>
        <p> 11. 图书馆是重点防火单位，严禁在馆内任何地方吸烟、充电、用火，不得违规使用电器。</P>
        <p> 12. 自觉遵守本馆的各项规章制度，支持工作人员的工作。</P>
        <p> 13. 对违反上述规定者，任何人都有权进行制止和批评，情节严重者由我馆会同有关部门予以处理。</P>
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