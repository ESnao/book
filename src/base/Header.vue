<template>
  <div id="nav-bar">
    <ul>
      <router-link :to="'/'" tag="li">首页</router-link>
      <router-link  tag="li" v-for="(list, id) in headerList" :key="id" :to="list.url">{{list.menuName}}</router-link>
      <router-link :to="'/login'" tag="li">登录</router-link>
    </ul>
  </div>
</template>

<script lang="typescript">
import Axios from "axios";
import Cookies from 'js-cookie';
export default {
  name: "nav-bar",
  data() {
    return {
      headerList: []
    };
  },
  computed: {},
  methods: {
    getHeaderList() { 
        console.log(Cookies.get('token'));
      Axios.get("/api/guest/menu/get", 
    //    {headers: {
    //   'content-type': 'application/x-www-form-urlencoded',
    //   JSESSIONID: Cookies.get('token'), 
    // }}
    ).then(res => {
        this.headerList = res.data.data;
      });
    }
  },
  mounted() {
    this.getHeaderList();
  }
};
</script>

<style lang="stylus">
#nav-bar {
  height: 60px;
  background-color: gray;

  >ul {
    list-style-type: none;
    margin-left: 600px;

    >li {
      display: inline-block;
      padding: 20px;
      cursor: pointer;
      color: white;
    }
  }
}
</style>