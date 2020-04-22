<template>
    <div id="static">
        <h1>title</h1>
        <div class="content">
            ssss
        </div>
    </div>
</template>

<script lang="typescript">
export default {
    name: 'static',
    data() {
        return {
            content: ''      // 来自后台的文本内容
        }
    }
}
</script>

<style lang="stylus" scoped>
    #static
        padding 10px;
        box-shadow 2px 2px 10px #b2baca;
        h1
            text-align center;
        .content
            background-color #fff;
</style>