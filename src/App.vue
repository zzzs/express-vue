<template>
    <div id="app">
        <img src="./assets/logo.png">
        <button @click="aaaa">111111111111111</button>
        <router-view/>
    </div>
</template>

<script>
import { Toast } from 'mint-ui'
export default {
    name: 'App',
    methods: {
        aaaa () {
            Toast('提示信息')
        }
    }
}
</script>

<style>
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
</style>
