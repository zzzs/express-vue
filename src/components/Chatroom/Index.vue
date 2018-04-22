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
                <div :class="username === item.username ? 'mine-msg' : ''" :key="key" v-for="(item, key) in msgPool">
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
import { MessageBox } from 'mint-ui'
export default {
    name: 'Chatroom',
    created () {
        var self = this
        this.socket = io.connect('ws://127.0.0.1:3000')

        this.socket.on('new message', function (data) {
            self.msgPool.push({
                username: data.username.name,
                msg: data.message.msg
            })
        })

        MessageBox.prompt('请输入骚名').then(({ value, action }) => {
            self.username = value
            self.socket.emit('add user', {name: value})
        }).catch(() => {
            self.$router.push('/')
        })
        // socket.emit('add user', {name: 'bob'})
        // socket.emit('new message', {msg: 'hello iam fine'})
    },
    methods: {
        sendMsg () {
            this.socket.emit('new message', {msg: this.msg})
            this.msg = ''
        }
    },
    data () {
        return {
            msg: '',
            msgPool: [],
            username: '',
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
