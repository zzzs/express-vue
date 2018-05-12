<template>
    <div>
        <mt-header title="致敬经典-新增诗句">
            <router-link to="/history" slot="left">
                <mt-button icon="back">返回</mt-button>
            </router-link>
            <mt-button icon="more" slot="right"></mt-button>
        </mt-header>

        <mt-field label="作者" type="text" placeholder="请输入作者名" v-model="author"></mt-field>
        <mt-field label="诗名" type="text" placeholder="请输入诗名" v-model="name"></mt-field>

        <mt-field
            :key="'addverse' + key" v-for="(item, key) in content"
            v-model="content[key]"
            label="诗句" type="text" placeholder="请输入诗句">
            <mt-button style="margin-left: 5px;" type="default" @click="content.splice(key, 1)">-</mt-button>
        </mt-field>
        <br>
        <mt-button type="default" @click="content.push('')">+</mt-button>
<!-- style="position: absolute; bottom: 0;" -->
        <mt-button @click="addVerse" type="primary" size="large">提交</mt-button>
    </div>
</template>

<script>
import { Toast } from 'mint-ui'
import qs from 'qs'

export default {
    data () {
        return {
            author: '',
            name: '',
            content: ['']
        }
    },
    mounted () {
        this.author = ''
        this.name = ''
        this.content = ['']
    },
    methods: {
        addVerse () {
            // var self = this
            var data = {
                name: this.name,
                content: JSON.stringify(this.content),
                aid: this.author
            }
            fetch('/verses/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
                },
                body: qs.stringify(data)
            }).then(function (response) {
                return response.json()
            }).then(function (result) {
                if (result.errcode === 0) {
                    Toast({
                        message: '提交成功',
                        position: 'top',
                        duration: 2000
                    })
                    // self.$router.push('/history')
                } else {
                    console.log(result.errmsg)
                }
            })
        }
    },
    computed: {

    }
}
</script>

<style lang="less" >
    @import './../../less/history/index.less';
</style>
