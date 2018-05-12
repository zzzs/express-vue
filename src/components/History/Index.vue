<template>
    <div>
        <mt-header title="致敬经典">
            <router-link to="/" slot="left">
                <mt-button icon="back">返回</mt-button>
            </router-link>
            <mt-button icon="more" slot="right"></mt-button>
        </mt-header>

        <div>
            <mt-search style="width: calc(100% - 50px); float: left;" v-model="content"></mt-search>
            <router-link to="/history/add">
                <mt-button style="width: 40px; float: left; margin: 5px;" type="primary">+</mt-button>
            </router-link>
        </div>

        <mt-cell
            style="clear: both;"
            :key="'verse' + key" v-for="(item, key) in versesData"
            :title="item.name + ' ' + item.aid"
            :value="item.aid">
            <mt-button @click="showPopup(item)" style="margin-right: 5px;">展示</mt-button>
            <mt-button @click="deleteVerse(item)" type="danger">删除</mt-button>
        </mt-cell>
        <mt-popup
            style="margin-top: 100px;"
            position="top"
            popup-transition="popup-fade"
            v-model="popupVisible">
            <mt-cell
                :title="popupData.name">
            </mt-cell>
            <mt-cell
                :value="popupData.aid">
            </mt-cell>
            <mt-cell
                :key="'popup' + key" v-for="(item, key) in popupData.content"
                :title="item">
            </mt-cell>
        </mt-popup>
    </div>
</template>

<script>
import { Toast, MessageBox } from 'mint-ui'
import qs from 'qs'

export default {
    name: 'History',
    data () {
        return {
            content: '',
            versesData: [],
            popupVisible: false,
            popupData: []
        }
    },
    mounted () {
        this.getVersesData()
    },
    methods: {
        showPopup (item) {
            this.popupVisible = true
            this.popupData = item
        },
        getVersesData () {
            let self = this
            fetch('/verses').then(function (response) {
                return response.json()
            }).then(function (result) {
                if (result.errcode === 0) {
                    self.versesData = result.result
                } else {
                    console.log(result.errmsg)
                }
            })
        },
        deleteVerse (item) {
            var self = this
            let msg = '确定删除这首【' + item.name + '】吗?'
            MessageBox.confirm(msg)
                .then(action => {
                    fetch('/verses/delete', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
                        },
                        body: qs.stringify({id: item._id})
                    }).then(function (response) {
                        return response.json()
                    }).then(function (result) {
                        if (result.errcode === 0) {
                            Toast({
                                message: '提交成功',
                                position: 'top',
                                duration: 2000
                            })
                            self.getVersesData()
                        } else {
                            console.log(result.errmsg)
                        }
                    })
                })
                .catch(() => {
                })
        }
    },
    computed: {

    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

    <style lang="less" >
        @import './../../less/history/index.less';
    </style>

<style scoped>
.mint-search {
    height: 100%;
}
</style>
