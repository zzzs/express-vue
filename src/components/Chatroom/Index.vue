<template>
    <div>
        <mt-header title="吟诗作对">
            <router-link to="/" slot="left">
                <mt-button icon="back">返回</mt-button>
            </router-link>
            <mt-button icon="more" slot="right"></mt-button>
        </mt-header>
        <div class="chat-main">
            <div class="chat-panel">
                <div :key="key" v-for="(item, key) in msgPool">
                    {{ item.username }}: {{ item.msg }}
                </div>
            </div>

            <div class="input-msg">
                <textarea v-model="msg" placeholder="骚友请题诗..."></textarea>
                <mt-button class="chat-send" type="primary" @click="sendMsg">发送</mt-button>
            </div>
        </div>
    </div>
</template>

<script>
import io from 'socket.io-client'
export default {
    name: 'Chatroom',
    created () {
        this.socket = io.connect('ws://127.0.0.1:3000')
        this.socket.emit('add user', {name: 'bob'})
        // socket.emit('add user', {name: 'bob'})
        // socket.emit('new message', {msg: 'hello iam fine'})

        var self = this
        this.socket.on('new message', function (data) {
            self.msgPool.push({
                username: data.username.name,
                msg: data.message.msg
            })
        })
    },
    methods: {
        sendMsg () {
            this.msgPool.push({
                username: 'bob',
                msg: this.msg
            })
            this.socket.emit('new message', {msg: this.msg})
        }
    },
    data () {
        return {
            msg: '',
            msgPool: [],
            socket: null
        }
    },
    computed: {

    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang="less" >
    @import './../../less/chatroom/index.less';
</style>

<style scoped>
</style>
