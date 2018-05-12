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
            is-link
            style="clear: both;"
            :key="'verse' + key" v-for="(item, key) in versesData"
            :title="item.name"
            :value="item.aid">
            <mt-button @click="showPopup(item)">展示</mt-button>
        </mt-cell>
        <mt-popup
            v-model="popupVisible">
            <mt-cell
                :key="'popup' + key" v-for="(item, key) in popupContent"
                :title="item">
            </mt-cell>
        </mt-popup>
    </div>
</template>

<script>
export default {
    name: 'History',
    data () {
        return {
            content: '',
            versesData: [],
            popupVisible: false,
            popupContent: []
        }
    },
    mounted () {
        this.getVersesData()
    },
    methods: {
        showPopup (item) {
            console.log('showPopup')
            this.popupVisible = true
            this.popupContent = item.content
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
