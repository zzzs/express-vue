<template>
    <div>
        <mt-header :title="'吟诗作对（' + userNum + '）'">
            <router-link to="/" slot="left">
                <mt-button icon="back">返回</mt-button>
            </router-link>
            <mt-button icon="more" slot="right"></mt-button>
        </mt-header>
        <div class="chat-main">
            <mt-navbar v-model="currentRoom">
                <mt-tab-item id="item._id" @click="clickRoom(item._id)" :key="key" v-for="(item, key) in roomData">
                    {{ item.name }}({{ roomUsersNum[item._id] === undefined ? 0 : roomUsersNum[item._id] }})
                </mt-tab-item>
            </mt-navbar>
            <div class="chat-panel">
                <div class="chat-item" :class="username === item.username ? 'mine-msg' : ''" :key="'msg' + key" v-for="(item, key) in msgPool">
                    <div class="chat-name">{{ item.username }}</div>
                    <div class="chat-msg">{{ item.msg }}</div>
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
import { Toast, MessageBox } from 'mint-ui'

export default {
    name: 'Chatroom',
    created () {
        var self = this
        this.socket = io.connect('ws://127.0.0.1:3000')

        this.socket.on('roomdata', function (data) {
            self.roomData = data.room
            self.currentRoom = data.room[0]['_id']
        })

        this.socket.on('new message', function (data) {
            self.msgPool.push({
                username: data.user.name,
                msg: data.message.msg
            })
        })

        this.socket.on('login', function (data) {
            Toast({
                message: '登录成功',
                position: 'top',
                duration: 3000
            })

            self.msgPool = data.chatData
        })

        this.socket.on('room changed', function (data) {
            self.msgPool = data.chatData
        })

        this.socket.on('user num', function (data) {
            self.userNum = data.numUsers
            self.roomUsersNum = data.roomUsersNum
        })

        this.socket.on('user joined', function (data) {
            Toast({
                message: data.user.name + 'is coming',
                position: 'bottom',
                duration: 5000
            })
        })

        MessageBox.prompt('请输入骚名').then(({ value, action }) => {
            self.username = value
            self.socket.emit('add user', {name: value, roomId: this.currentRoom})
        }).catch(() => {
            self.$router.push('/')
        })
    },
    methods: {
        sendMsg () {
            this.socket.emit('new message', {msg: this.msg, roomId: this.currentRoom})
            this.msg = ''
        },
        clickRoom (roomId) {
            if (this.currentRoom === roomId) {
                return
            }
            var oldRoomId = this.currentRoom
            this.currentRoom = roomId
            this.socket.emit('change room', {roomId: this.currentRoom, oldRoomId: oldRoomId})
        }
    },
    data () {
        return {
            msg: '',
            msgPool: [],
            roomData: [],
            currentRoom: '1',
            roomUsersNum: {},
            username: '',
            socket: null,
            userNum: 0
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
