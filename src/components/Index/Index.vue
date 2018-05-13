<template>
    <div>
        <div class="index-header">
            <h1 class="logo">诗骚</h1>
            <h2 class="">心哀出好句，颓废词更才。</h2>
            <h2 class="">悲骚文人客，风流诗词人。</h2>
        </div>
        <ul class="index-ul">
            <li><router-link to="/chatroom">吟诗作对</router-link></li>
            <li><router-link to="/history">致敬经典</router-link></li>
            <li><router-link to="/future">添砖加瓦</router-link></li>
        </ul>
    </div>
</template>

<script>
// import { Toast } from 'mint-ui'
export default {
    name: 'Index',
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
    @import './../../less/index.less';
</style>

<style scoped>
</style>
