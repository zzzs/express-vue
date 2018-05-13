<template>
    <div>
        <mt-header title="添砖加瓦">
            <router-link to="/" slot="left">
                <mt-button icon="back">返回</mt-button>
            </router-link>
            <mt-button icon="more" slot="right"></mt-button>
        </mt-header>
    </div>
</template>

<script>
export default {
    name: 'Future',
    data () {
        return {
        }
    },
    computed: {

    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang="less" >
    @import './../../less/future/index.less';
</style>

<style scoped>
</style>
