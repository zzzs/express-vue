<template>
    <div class="hello">
        <h1 class="aaa">{{ msg }} {{ xxx }}</h1>
        <h2 class="font-red">Essential Links</h2>
    </div>
</template>

<script>
export default {
    name: 'HelloWorld',
    data () {
        return {
            msg: 'Welcome to Your Vue.js App'
        }
    },
    computed: {
        xxx () {
            return this.$store.state.bbb
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang="scss">
    @import './../scss/index.scss';
    .aaa {
        color: blue;
    }
</style>

<style scoped>
h1, h2 {
    font-weight: normal;
}
ul {
    list-style-type: none;
    padding: 0;
}
li {
    display: inline-block;
    margin: 0 10px;
}
a {
    color: #42b983;
}
</style>
