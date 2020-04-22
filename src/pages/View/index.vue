<template>
    <div id="app">
        <nav-bar></nav-bar>
        <div id="main">
            <router-view></router-view>
        </div>
        <footer>
            版权所有 ©2020 陈曦毕业设计 版权所有
        </footer>
    </div>
</template>

<script lang="typescript">
import Header from '../../base/Header.vue';

export default {
    name: 'app',
    data() {
        return {

        }
    },
    components: {
        'nav-bar': Header
    }
}
</script>

<style lang="stylus">
#app
    width: 1180px;
    margin: 0 auto;
    >footer 
        height 100px;
        background white;
        line-height 100px;
        text-align center;
        bottom 0;
</style>
