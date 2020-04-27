<template>
  <div id="home">
    <div class="input-wrapper">
      <input type="text" placeholder="输入关键字" />
      <button>搜索</button>
    </div>

    <div class="banner-wrapper">
      <swiper :options="swiperOption">
        <swiper-slide>
          <img src="../../../../images/banner3.png" />
        </swiper-slide>
        <swiper-slide>
          <img src="../../../../images/banner3.png" />
        </swiper-slide>
        <swiper-slide>
          <img src="../../../../images/banner3.png" />
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
        <div class="swiper-button-prev" slot="button-prev"></div>
        <div class="swiper-button-next" slot="button-next"></div>
      </swiper>
    </div>

    <!-- 功能区 -->
    <div class="main">
      <div class="nav-bar">
        <div class="service">服务</div>
        <div class="new">最新上架</div>
      </div>

      <div class="content-wrapper">
        <div class="icons-wrapper">
          <div>
            <span class="icon-item">
              <router-link :to="'/static'">
                <i class="iconfont icon-shiyongxuzhi"></i>
                <p>入馆须知</p>
              </router-link>
            </span>
            <span class="icon-item">
              <router-link :to="'/static02'">
                <i class="iconfont icon-huodong"></i>
                <p>本馆概述</p>
              </router-link>
            </span>
            <span class="icon-item">
              <router-link :to="'/static03'">
                <i class="iconfont icon-shijian"></i>
                <p>开馆时间</p>
              </router-link>
            </span>
            <span class="icon-item">
              <router-link :to="'/static04'">
                <i class="iconfont icon-jiangzuo"></i>
                <p>新人专栏</p>
              </router-link>
            </span>
            <span class="icon-item">
              <router-link :to="'/static05'">
                <i class="iconfont icon-zixun"></i>
                <p>参考咨询</p>
              </router-link>
            </span>
            <span class="icon-item">
              <router-link :to="'/static06'">
                <i class="iconfont icon-liucheng"></i>
                <p>退卡流程</p>
              </router-link>
            </span>
            <span class="icon-item">
              <a @click="goBorrow()">
                <i class="iconfont icon-book-information-i-borrow"></i>
                <p>我的借阅</p>
              </a>
            </span>
            <span class="icon-item">
              <router-link :to="'/static08'">
                <i class="iconfont icon-wenti"></i>
                <p>常见问题</p>
              </router-link>
            </span>
            <span class="icon-item">
              <router-link :to="'/thesis'">
                <i class="iconfont icon-xueshimao"></i>
                <p>论文查询</p>
              </router-link>
            </span>
          </div>
        </div>

        <!-- 最新上架 -->
        <div class="new-books">
          <p v-for="book in bookList" :key="book.id" class="books" @click="toBook()"> 书名：《 {{ book.bookName }} 》作者：{{book.author}} </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="typescript">
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import "../../../../css/fonts/iconfont/iconfont.css";
import Cookies from "js-cookie";
import Axios from "axios";

export default {
  name: "home",
  data() {
    return {
      role: Cookies.get("token")&&JSON.parse(Cookies.get("token")).role,
      swiperOption: {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        pagination: {
          el: ".swiper-pagination",
          clickable: true
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        },
        autoplay: true
      },
      bookList: []
    };
  },
  methods: {
    goBorrow() {
      if (this.role) {
        this.$router.replace("/borrow");
      } else {
        this.$message({
            message: "请先登录！",
            type: "error"
          });
        this.$router.replace("/login");
      }
    },
      search() {
      Axios.get("/api/book/guest/search", {
        params: {
          page:0,
          size:13
        }
      }).then(res => {
        this.bookList = res.data.data.content;
      });
    },
    toBook(){
           this.$router.replace("/book");
    }
  },
  mounted() {
    this.search();
  },
  components: {
    Swiper,
    SwiperSlide
  }
};
</script>

<style lang="stylus" scoped>
#home {
  .input-wrapper {
    padding: 10px;
    text-align: center;
    >input {
      width: 400px;
      height: 25px;
      padding:0 10px;
    }
    >button {
      border-radius: 4%;
      background: #3378dd;
      color: white;
      width: 60px;
      height: 25px;
      border: none;
      cursor: pointer;
    }
  }
  .banner-wrapper {
    text-align: center;
    margin: 0 auto;
    border: 1px solid wheat;

    >img {
      width: 100%;
      height: 300px;
    }
  }

  // 功能区
  .main {
    .nav-bar {
      display: flex;
      height: 60px;
      background: green;
      color: white;
      font-size: 20px;

      .service {
        flex: 6;
        line-height: 60px;
        text-align: center;
      }

      .new {
        flex: 4;
        line-height: 60px;
        text-align: center;
      }
    }

    .content-wrapper {
      display: flex;
      margin: 10px 0;

      .icons-wrapper {
        flex: 6;
        background: white;
        text-align: center;
        margin-right: 10px;

        >div {
          .icon-item {
            width: 180px;
            height: 100px;
            text-align: center;
            cursor: pointer;
            display: inline-block;
            padding: 10px 0;

            .iconfont {
              font-size: 50px;
            }

            >p {
              font-size: 16px;
            }

            >a {
              text-decoration: none;
              color: black;
            }
          }
        }
      }

      .new-books {
        flex: 4;
        background: white;
        padding:3px 0;

        >p {
          margin: 5px 0;
          max-width :500px;
          word-break:keep-all;
          white-space:nowrap;
          overflow:hidden;
          padding: 0 20px;
          cursor pointer
          text-overflow:ellipsis;
        }
      }
    }
  }
}
</style>