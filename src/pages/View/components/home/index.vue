<template>
    <div id="home">
        <div class="input-wrapper">
            <input type="text" placeholder="输入关键字">
            <button>搜索</button>
        </div>

        <div class="banner-wrapper">
            <swiper :options="swiperOption">
                <swiper-slide><img src="../../../../images/a.jpg"></swiper-slide>
                <swiper-slide><img src="../../../../images/b.jpg"></swiper-slide>
                <swiper-slide><img src="../../../../images/c.jpg"></swiper-slide>
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
                            <router-link :to="'/Static'">
                                <i class="iconfont icon-shiyongxuzhi"></i>
                                <p>入馆须知</p>
                            </router-link>
                        </span>
                        <span class="icon-item"><i class="iconfont icon-yemiantuiguang"></i><p>阅读推广</p></span>
                        <span class="icon-item"><i class="iconfont icon-shijian"></i><p>开馆时间</p></span>
                        <span class="icon-item"><i class="iconfont icon-wiappfangwenliang"></i><p>校外访问</p></span>

                        <span class="icon-item"><i class="iconfont icon-jiangzuo"></i><p>讲座预约</p></span>
                        <span class="icon-item"><i class="iconfont icon-zuowei"></i><p>座位预约</p></span>
                        <span class="icon-item"><i class="iconfont icon-file-delivery"></i><p>文献传递</p></span>
                        <span class="icon-item"><i class="iconfont icon-kongjianyuyue"></i><p>空间预约</p></span>

                        <span class="icon-item"><i class="iconfont icon-lubiao"></i><p>新手指南</p></span>
                        <span class="icon-item"><i class="iconfont icon-zixun"></i><p>参考咨询</p></span>
                        <span class="icon-item"><i class="iconfont icon-book-information-i-borrow"></i><p>我的借阅</p></span>
                        <span class="icon-item"><i class="iconfont icon-huodong"></i><p>活动与培训</p></span>

                        <span class="icon-item"><i class="iconfont icon-wenti"></i><p>常见问题</p></span>
                        <span class="icon-item"><i class="iconfont icon-ip"></i><p>IP查询</p></span>
                        <span class="icon-item"><i class="iconfont icon-liucheng"></i><p>离校流程</p></span>
                        <span class="icon-item"><i class="iconfont icon-xueshimao"></i><p>学位论文提交</p></span>
                    </div>
                </div>

                <!-- 最新上架 -->
                <div class="new-books">
                    <p v-for="book in bookList" :key="book.id">{{ book.name }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="typescript">
import { Swiper, SwiperSlide } from 'vue-awesome-swiper';
import '../../../../css/fonts/iconfont/iconfont.css';

export default {
    name: 'home',
    data() {
        return {
            swiperOption: {
                slidesPerView: 1,
                spaceBetween: 30,
                loop: true,
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true
                },
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev'
                },
                autoplay: true
            },
            bookList: [
                { id: 1, name: '三国演义' },
                { id: 2, name: '水浒传' },
                { id: 3, name: '西游记' },
                { id: 4, name: '红楼梦' }
            ]
        }
    },
    components: {
        Swiper,
        SwiperSlide
    }
}
</script>

<style lang="stylus" scoped>
#home
    .input-wrapper
        padding 10px;
        text-align center;
        >input 
            width 400px;
            height 25px;
        >button
            border-radius 4%;
            background #3378dd;
            color white;
            width 60px;
            height 25px;
            border none;
            cursor pointer;
    .banner-wrapper
        text-align center;
        margin 0 auto;
        border 1px solid wheat;
        >img
            width 100%;
            height 300px;
    // 功能区
    .main
        .nav-bar
            display flex;
            height 60px;
            background green;
            color white;
            font-size 20px;
            .service
                flex 6;
                line-height 60px;
                text-align center;
            .new
                flex 4;
                line-height 60px;
                text-align center;
        .content-wrapper
            display flex;
            margin 10px 0;
            .icons-wrapper
                flex 6;
                background white;
                text-align center;
                margin-right 10px;
                >div
                    .icon-item
                        width 150px;
                        height 100px;
                        text-align center;
                        cursor pointer;
                        display inline-block;
                        padding 10px 0;
                        .iconfont
                            font-size 50px;
                        >p
                            font-size 16px;
                        >a
                            text-decoration none;
                            color black;
            .new-books
                flex 4;
                text-align center;
                background white;
                >p
                    margin 5px 0;
</style>