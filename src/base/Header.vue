<template>
  <div id="nav-bar">
    <ul>
      <router-link :to="'/'" tag="li">首页</router-link>
      <router-link
        tag="li"
        v-for="(list, id) in headerList"
        :key="id"
        :to="list.url"
      >{{list.menuName}}</router-link>
      <router-link :to="'/login'" tag="li" v-if="!iflog">登录</router-link>
      <li  v-else @click='logout'>退出登录</li>
    </ul>
  </div>
</template>

<script lang="typescript">
import Axios from "axios";
import Cookies from "js-cookie";
export default {
  name: "nav-bar",
  data() {
    return {
      headerList: [],
      token: Cookies.get("token")
    };
  },
  computed: {
    iflog(){
      return this.token
    }
  },
  methods: {
    getHeaderList() {
      Axios.get("/api/guest/menu/get").then(res => {
        this.headerList = res.data.data;
      });
    },
    logout(){
    Axios.post("/api/logout").then(res => {
      Cookies.remove("token");
      this.token='';
      this.getHeaderList();
      });
    },
    
  },
  mounted() {
    console.log(Cookies.get("token"))
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
    display :flex;
    justify-content :flex-end;

    >li {
      display: inline-block;
      padding: 20px;
      cursor: pointer;
      color: white;
    }
  }

}
</style>