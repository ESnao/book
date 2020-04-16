<template>
    <div id="nav-bar">
        <ul>
            <router-link :to="'/'" tag="li">首页</router-link>
            <router-link to="" tag="li">本馆概况</router-link>
            <router-link to="" tag="li">权限管理</router-link>
            <router-link to="" tag="li">图书管理</router-link>
            <router-link to="" tag="li">登录</router-link>
        </ul>
    </div>
</template>

<script lang="typescript">
export default {
    name: 'nav-bar',
    data() {
        return {

        }
    }
}
</script>

<style lang="stylus">
    #nav-bar
        height 60px;
        background-color gray;
        >ul
            list-style-type none;
            margin-left 600px;
            >li
                display inline-block;
                padding 20px;
                cursor pointer;
                color white;
</style>